import type { ReactNode } from 'react';

export function LoadingState({ label = 'Cargando contenido...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-violet-500/20 bg-slate-900/60 p-6 text-sm text-slate-300">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
      {label}
    </div>
  );
}

export function ErrorState({ message = 'No pudimos cargar esta información.' }: { message?: string }) {
  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-100">
      {message}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

export function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm text-slate-300 md:text-base">{description}</p> : null}
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-violet-200">Servidor Uverley</p>
      <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-slate-300">{subtitle}</p>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`soft-card rounded-3xl p-5 ${className}`}>{children}</div>;
}
