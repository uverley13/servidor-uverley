import { useEffect, useState } from 'react';
import { AdminPage, BenefitsSection, ContactSection, FaqSection, Footer, Header, Hero, LoginPanel, PricingSection, ProcessSection, ProfilePage, RouteNotFound, ServicesSection } from './components/ui';
import { defaultUsers, services as localServices } from './lib/mock-data';
import { fetchServicesFromSupabase, getCurrentAppUser, hasSupabaseConfig, signInWithEmail, signInWithGoogle, signOutFromSupabase, signUpWithEmail } from './lib/supabase';
import { readStoredSession, readStoredUsers, saveStoredSession, saveStoredUsers } from './lib/storage';
import type { Service, User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(() => readStoredSession());
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [route, setRoute] = useState(typeof window === 'undefined' ? '/' : window.location.pathname);

  useEffect(() => {
    const load = async () => {
      if (!readStoredUsers().length) saveStoredUsers(defaultUsers);
      try {
        if (hasSupabaseConfig) {
          const current = await getCurrentAppUser();
          if (current) setUser(current);
          const remote = await fetchServicesFromSupabase();
          setServices(remote.length ? remote : localServices as Service[]);
        } else setServices(localServices as Service[]);
      } catch (cause) {
        console.error(cause); setServices(localServices as Service[]); setError('No se pudo conectar con el servicio. Mostrando información local.');
      } finally { setLoading(false); }
    };
    void load();
  }, []);

  useEffect(() => { const onPop = () => setRoute(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { saveStoredSession(user); }, [user]);

  const navigate = (path: string) => { window.history.pushState({}, '', path); setRoute(path); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const login = async (email: string, password: string) => {
    try {
      const signed = hasSupabaseConfig ? await signInWithEmail(email, password) : [...defaultUsers, ...readStoredUsers()].find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password) as User | undefined;
      if (!signed) throw new Error('Correo o contraseña incorrectos.');
      setUser(signed); setError(null); setLoginOpen(false); navigate(signed.role === 'admin' ? '/admin' : '/perfil');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo iniciar sesión.'); }
  };
  const register = async (name: string, email: string, password: string) => {
    try {
      if (hasSupabaseConfig) { const created = await signUpWithEmail(name, email, password); setUser(created); setLoginOpen(false); setError(null); navigate('/perfil'); return; }
      const users = readStoredUsers(); if (users.some((item) => item.email.toLowerCase() === email.trim().toLowerCase())) throw new Error('Ya existe una cuenta con ese correo.');
      const created: User = { id: `local-${Date.now()}`, name: name.trim(), email: email.trim(), password, role: 'cliente', balance: 0, orders: [], rechargeHistory: [] }; saveStoredUsers([...users, created]); setUser(created); setLoginOpen(false); navigate('/perfil');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo crear la cuenta.'); }
  };
  const googleLogin = async () => { try { await signInWithGoogle(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo iniciar con Google.'); } };
  const logout = async () => { if (hasSupabaseConfig) await signOutFromSupabase().catch(console.error); setUser(null); navigate('/'); };

  return <div className="min-h-screen bg-slate-950 text-white"><Header user={user} onLogin={() => setLoginOpen(true)} onLogout={logout} onNavigate={navigate} />{route === '/' ? <><Hero /><ServicesSection services={services} loading={loading} error={error} /><BenefitsSection /><PricingSection /><ProcessSection /><FaqSection /><ContactSection /></> : null}{route === '/perfil' ? user ? <ProfilePage user={user} onLogout={logout} /> : <RouteNotFound message="Inicia sesión para acceder a tu perfil." /> : null}{route === '/admin' ? user?.role === 'admin' ? <AdminPage user={user} /> : <RouteNotFound message="No tienes permisos para acceder a esta sección." /> : null}{route !== '/' && route !== '/perfil' && route !== '/admin' ? <RouteNotFound /> : null}<Footer />{loginOpen ? <LoginPanel error={error} onSubmit={login} onRegister={register} onGoogle={googleLogin} onCancel={() => { setLoginOpen(false); setError(null); }} /> : null}</div>;
}
