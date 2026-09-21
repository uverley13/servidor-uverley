import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  CircleCheckBig,
  Headset,
  Menu,
  MessageCircleMore,
  MonitorSmartphone,
  PackageCheck,
  ShieldCheck,
  Settings2,
  Smartphone,
  Star,
  UserCircle2,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import type { AppRole, Benefit, FaqItem, NavItem, Service, User } from '../types';

export const iconMap: Record<string, typeof MonitorSmartphone> = {
  MonitorSmartphone,
  Smartphone,
  PackageCheck,
  Headset,
  Settings2,
  MessageCircleMore,
  ShieldCheck,
  Zap,
  BadgeDollarSign,
  Users,
  Wallet,
  UserCircle2,
  CircleCheckBig,
  ArrowRight,
  Star,
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored) as T;
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function toRoleLabel(role: AppRole) {
  return role === 'admin' ? 'Administrador' : 'Cliente';
}

export function getServiceIcon(iconName: string) {
  const Icon = iconMap[iconName] ?? MonitorSmartphone;
  return Icon;
}

export function getBenefitIcon(iconName: string) {
  const Icon = iconMap[iconName] ?? ShieldCheck;
  return Icon;
}

export function getNavItems(): NavItem[] {
  return [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Precios', href: '#precios' },
    { label: 'Preguntas frecuentes', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];
}

export function getDemoUser(): User {
  return {
    id: 'cliente-demo',
    name: 'Cliente Demo',
    email: 'cliente@servidoruverley.com',
    password: 'cliente123',
    role: 'cliente',
    balance: 125000,
    orders: [{ id: 'PED-2002', service: 'Gestión de pedidos', status: 'Completado', amount: 75000, date: '2026-09-14' }],
    rechargeHistory: [{ id: 'REC-2', amount: 100000, status: 'Aprobado', date: '2026-09-11' }],
  };
}

export function sortFaqs(faqs: FaqItem[]) {
  return useMemo(() => faqs, [faqs]);
}

export function menuButtonBaseClass() {
  return 'inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-violet-400/60 hover:bg-violet-500/10';
}

export function getServiceData(): Service[] {
  return [
    {
      id: '1',
      name: 'Servicios digitales',
      description: 'Diseño, optimización y adaptaciones para su presencia digital.',
      price: 'Desde $35.000',
      icon: 'MonitorSmartphone',
      active: true,
    },
    {
      id: '2',
      name: 'Soporte para dispositivos móviles',
      description: 'Asistencia técnica y conexión rápida para equipos Android e iPhone.',
      price: 'Desde $25.000',
      icon: 'Smartphone',
      active: true,
    },
    {
      id: '3',
      name: 'Gestión de pedidos',
      description: 'Control de ventas, seguimiento y organización de operaciones.',
      price: 'Desde $45.000',
      icon: 'PackageCheck',
      active: true,
    },
    {
      id: '4',
      name: 'Asistencia personalizada',
      description: 'Acompañamiento humano para dudas, ajustes y requerimientos puntuales.',
      price: 'Consultar',
      icon: 'Headset',
      active: true,
    },
    {
      id: '5',
      name: 'Configuración tecnológica',
      description: 'Instalación, revisión y mejora de entornos de trabajo.',
      price: 'Desde $60.000',
      icon: 'Settings2',
      active: true,
    },
    {
      id: '6',
      name: 'Atención por WhatsApp',
      description: 'Soporte directo, rápido y a la mano para consultas urgentes.',
      price: 'Disponible',
      icon: 'MessageCircleMore',
      active: true,
    },
  ];
}

export function getBenefitsData(): Benefit[] {
  return [
    {
      title: '100% seguro',
      description: 'Procesos confiables con acompñamiento responsable y manejo cuidadoso.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Atención rápida',
      description: 'Respuesta inmediata para mantener tu negocio o servicio en movimiento.',
      icon: 'Zap',
    },
    {
      title: 'Precios competitivos',
      description: 'Opciones flexibles para distintas necesidades y presupuestos.',
      icon: 'BadgeDollarSign',
    },
    {
      title: 'Soporte personalizado',
      description: 'Atención cercana y adaptada a cada caso y objetivo.',
      icon: 'Users',
    },
  ];
}

export function getAdminMockData() {
  return {
    totalClients: 128,
    balances: 8450000,
    pendingOrders: 18,
    pendingRecharges: 7,
    movementBalance: 2600000,
  };
}

export const hamburgerIconMap = {
  Menu,
  X,
};
