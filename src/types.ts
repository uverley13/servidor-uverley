import type { ReactNode } from 'react';

export type AppRole = 'cliente' | 'admin';

export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
  active: boolean;
};

export type Benefit = {
  title: string;
  description: string;
  icon: string;
};

export type PricingPlan = {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  cta: string;
  highlight?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Order = {
  id: string;
  service: string;
  status: 'Pendiente' | 'Procesando' | 'Completado';
  amount: number;
  date: string;
};

export type RechargeRequest = {
  id: string;
  amount: number;
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
  date: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AppRole;
  balance: number;
  orders: Order[];
  rechargeHistory: RechargeRequest[];
};

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type IconProps = {
  className?: string;
};

export type ChildrenOnly = {
  children: ReactNode;
};
