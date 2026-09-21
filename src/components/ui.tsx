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
import {
  fetchServicesFromSupabase,
  getCurrentAppUser,
  hasSupabaseConfig,
  signInWithEmail,
  signOutFromSupabase,
  signUpWithEmail,
} from './lib/supabase';
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

    const loadInitialData = async () => {
      try {
        if (hasSupabaseConfig) {
          const sessionUser = await getCurrentAppUser();
          if (sessionUser) {
            setUser(sessionUser);
          } else {
            const saved = readStoredSession();
            if (saved) setUser(saved);
          }

          const supabaseServices = await fetchServicesFromSupabase();
          if (supabaseServices.length > 0) {
            setServices(supabaseServices);
          } else {
            setServices(initialServices as Service[]);
          }
        } else {
          const saved = readStoredSession();
          if (saved) setUser(saved);
          setServices(initialServices as Service[]);
        }
      } catch (loadError) {
        console.error(loadError);
        setServices(initialServices as Service[]);
        setError('No se pudo cargar la información. Usando datos locales.');
      } finally {
        setLoading(false);
      }
    };

    void loadInitialData();
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

  const login = async (email: string, password: string) => {
    try {
      if (hasSupabaseConfig) {
        const signedIn = await signInWithEmail(email, password);
        if (!signedIn) {
          setError('No se pudo iniciar sesión con Supabase.');
          return;
        }
        setUser(signedIn);
        setShowLogin(false);
        setError(null);
        navigate(signedIn.role === 'admin' ? '/admin' : '/perfil');
        return;
      }

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
    } catch (loginError) {
      console.error(loginError);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      if (hasSupabaseConfig) {
        const created = await signUpWithEmail(name, email, password);
        if (!created) {
          setError('No se pudo crear la cuenta.');
          return;
        }
        setUser(created);
        setShowLogin(false);
        setError(null);
        navigate('/perfil');
        return;
      }

      const users = readStoredUsers();
      const exists = users.some((item) => item.email.trim().toLowerCase() === email.trim().toLowerCase());
      if (exists) {
        setError('Ya existe una cuenta con ese correo.');
        return;
      }

      const newUser: User = {
        id: `local-${Date.now()}`,
        name,
        email,
        password,
        role: 'cliente',
        balance: 0,
        orders: [],
        rechargeHistory: [],
      };

      const allUsers = [...users, newUser];
      saveStoredUsers(allUsers);
      setUser(newUser);
      setShowLogin(false);
      setError(null);
      navigate('/perfil');
    } catch (registerError) {
      console.error(registerError);
      setError('Error al crear la cuenta.');
    }
  };

  const logout = async () => {
    try {
      if (hasSupabaseConfig) {
        await signOutFromSupabase();
      }
    } catch (logoutError) {
      console.error(logoutError);
    } finally {
      setUser(null);
      navigate('/');
    }
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
      {showLogin ? (
        <LoginPanel error={error} onSubmit={login} onRegister={register} onCancel={() => { setShowLogin(false); setError(null); }} />
      ) : null}
    </div>
  );
}

export default App;
