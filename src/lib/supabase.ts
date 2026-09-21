import { createClient, type User as SupabaseAuthUser } from '@supabase/supabase-js';
import type { AppRole, Service, User } from '../types';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const hasSupabaseConfig = Boolean(url && anonKey);
export const supabase = hasSupabaseConfig ? createClient(url!, anonKey!, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }) : null;

export type SupabaseProfile = { id: string; full_name: string; role: AppRole; balance: number };

function mapUser(authUser: SupabaseAuthUser, profile?: SupabaseProfile | null): User {
  return { id: authUser.id, name: profile?.full_name ?? authUser.user_metadata?.full_name ?? authUser.email?.split('@')[0] ?? 'Usuario', email: authUser.email ?? '', password: '', role: profile?.role ?? 'cliente', balance: profile?.balance ?? 0, orders: [], rechargeHistory: [] };
}

async function profileFor(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('id, full_name, role, balance').eq('id', userId).maybeSingle();
  if (error && error.code !== 'PGRST116') console.warn('No se pudo cargar el perfil:', error.message);
  return data as SupabaseProfile | null;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error || !data.user) throw error ?? new Error('No se pudo iniciar sesión.');
  return mapUser(data.user, await profileFor(data.user.id));
}

export async function signInWithGoogle(): Promise<void> {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } });
  if (error) throw error;
}

export async function signUpWithEmail(name: string, email: string, password: string): Promise<User> {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() } } });
  if (error || !data.user) throw error ?? new Error('No se pudo crear la cuenta.');
  return mapUser(data.user, { id: data.user.id, full_name: name.trim(), role: 'cliente', balance: 0 });
}

export async function getCurrentAppUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;
  return mapUser(session.user, await profileFor(session.user.id));
}

export async function signOutFromSupabase() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function fetchServicesFromSupabase(): Promise<Service[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('services').select('id,name,description,price,icon,active').eq('active', true).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((item) => ({ id: item.id, name: item.name, description: item.description, price: `Desde $${Number(item.price).toLocaleString('es-CO')}`, icon: item.icon ?? 'MonitorSmartphone', active: item.active }));
}
