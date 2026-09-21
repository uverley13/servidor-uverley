import type { ComponentType, SVGProps } from 'react';
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

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export const iconLibrary: Record<string, IconType> = {
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
  UserCircle2,
  Wallet,
  ArrowRight,
  CircleCheckBig,
  Star,
  Menu,
  X,
};

export function getIcon(name: string): IconType {
  return iconLibrary[name] ?? MonitorSmartphone;
}
