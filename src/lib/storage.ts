import { useEffect, useState } from 'react';
import {
  AdminPage,
  BenefitsSection,
  ContactSection,
  FaqSection,
  Footer,
  Header,
  Hero,
  LoginPanel,
  PricingSection,
  ProcessSection,
  ProfilePage,
  RouteNotFound,
  ServicesSection,
} from './components/ui';
import { defaultUsers, services as initialServices } from './lib/mock-data';
import { readStoredSession, readStoredUsers, saveStoredSession, saveStoredUsers } from './lib/storage';
import type { Service, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(() => readStoredSession());
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [route, setRoute] = useState<string>(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));

  useEffect(() => {
    const existing = readStoredUsers();
    if (!existing.length) saveStoredUsers(defaultUsers);
    const timer = window.setTimeout(() => {
      setServices(initialServices as Service[]);
      setLoading(false);
    }, 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    saveStoredSession(user);
  }, [user]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, password: string) => {
    const match = [...defaultUsers, ...readStoredUsers()].find(
      (item) => item.email.trim().toLowerCase() === email.trim().toLowerCase() && item.password === password,
    );

    if (!match) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    setError(null);
    setUser(match);
    setShowLogin(false);
    navigate(match.role === 'admin' ? '/admin' : '/perfil');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const isHome = route === '/';

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header user={user} onLogin={() => setShowLogin(true)} onLogout={logout} onNavigate={navigate} />

      {isHome ? (
        <>
          <Hero />
          <ServicesSection services={services} loading={loading} error={error} />
          <BenefitsSection />
          <PricingSection />
          <ProcessSection />
          <FaqSection />
          <ContactSection />
        </>
      ) : null}

      {route === '/perfil' ? (user ? <ProfilePage user={user} onLogout={logout} /> : <RouteNotFound message="Inicia sesión para acceder a tu perfil." />) : null}
      {route === '/admin' ? (user?.role === 'admin' ? <AdminPage user={user} /> : <RouteNotFound message="No tienes permisos para acceder a esta sección." />) : null}
      {!isHome && route !== '/perfil' && route !== '/admin' ? <RouteNotFound /> : null}

      <Footer />
      {showLogin ? <LoginPanel error={error} onSubmit={login} onCancel={() => { setShowLogin(false); setError(null); }} /> : null}
    </div>
  );
}

export default App;
