import { useEffect, useState } from 'react';
import { Header, Hero, ServicesSection, BenefitsSection, PricingSection, ProcessSection, FaqSection, ContactSection, Footer, LoginPanel, ProfilePage, AdminPage, RouteNotFound } from './components/ui';
import { defaultUsers, services as initialServices } from './lib/mock-data';
import { readStoredSession, readStoredUsers, saveStoredSession, saveStoredUsers } from './lib/storage';
import type { User } from './types';

const demoUsers = defaultUsers;

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = readStoredSession();
    const storedUsers = readStoredUsers();
    if (saved) return saved;
    if (storedUsers.length) return storedUsers[0];
    return null;
  });
  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const storedUsers = readStoredUsers();
    if (!storedUsers.length) {
      saveStoredUsers(demoUsers);
    }

    const timer = window.setTimeout(() => {
      setServices(initialServices);
      setLoading(false);
      setError(null);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (user) {
      saveStoredSession(user);
    } else {
      saveStoredSession(null);
    }
  }, [user]);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  const login = (email: string, password: string) => {
    const users = readStoredUsers();
    const match = [...demoUsers, ...users].find((item) => item.email === email && item.password === password);

    if (!match) {
      setError('Credenciales incorrectas.');
      return;
    }

    setUser(match);
    setShowLogin(false);
    setError(null);
    handleNavigate(match.role === 'admin' ? '/admin' : '/perfil');
  };

  const logout = () => {
    setUser(null);
    handleNavigate('/');
  };

  const renderRoute = () => {
    if (route === '/perfil') {
      return user ? <ProfilePage user={user} onLogout={logout} /> : <div className="mx-auto max-w-4xl px-4 py-20 text-center"><div className="rounded-2xl border border-white/10 bg-slate-900/70 p-8"><p className="text-slate-300">Debes iniciar sesión para ver tu perfil.</p><button onClick={() => setShowLogin(true)} className="mt-5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white">Iniciar sesión</button></div></div>;
    }

    if (route === '/admin') {
      return user && user.role === 'admin' ? <AdminPage user={user} /> : <div className="mx-auto max-w-4xl px-4 py-20 text-center"><div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-rose-100">Acceso restringido.</div></div>;
    }

    if (route === '/registro') {
      return <div className="mx-auto max-w-4xl px-4 py-20 text-center"><div className="rounded-2xl border border-white/10 bg-slate-900/70 p-8"><p className="text-slate-300">La creación de usuarios estará disponible en la integración con Supabase.</p><button onClick={() => setShowLogin(true)} className="mt-5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white">Ir a login</button></div></div>;
    }

    if (route === '/') {
      return (
        <>
          <Hero />
          <ServicesSection services={services} loading={loading} error={error} />
          <BenefitsSection />
          <PricingSection />
          <ProcessSection />
          <FaqSection />
          <ContactSection />
        </>
      );
    }

    return <RouteNotFound />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header
        user={user}
        onLogin={() => setShowLogin(true)}
        onLogout={logout}
      />
      {renderRoute()}
      <Footer />
      {showLogin ? <LoginPanel onSubmit={login} onCancel={() => setShowLogin(false)} /> : null}
    </div>
  );
}

export default App;
