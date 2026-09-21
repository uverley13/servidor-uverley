import { useState } from 'react';
import { ArrowRight, ChevronDown, Menu, MessageCircleMore, X } from 'lucide-react';
import { navItems } from '../lib/mock-data';
import { cn } from '../utils';

export function Header({ user, onLogin, onLogout }: { user: any; onLogin: () => void; onLogout: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-base shadow-lg shadow-violet-900/30">
            S
          </span>
          <span>Servidor Uverley</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <a href="/perfil" className="text-sm text-slate-200 hover:text-white">Perfil</a>
              <button onClick={onLogout} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-violet-400/60 hover:bg-violet-500/10">
                Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={onLogin} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-violet-400/60 hover:bg-violet-500/10">
              Iniciar sesión
            </button>
          )}
          <a
            href="https://wa.me/573172329884"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-900/30 transition hover:scale-105"
          >
            <MessageCircleMore className="h-5 w-5" />
          </a>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden" aria-label="Abrir menú">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/5" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-3">
              {user ? (
                <button onClick={onLogout} className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                  Cerrar sesión
                </button>
              ) : (
                <button onClick={() => { onLogin(); setOpen(false); }} className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                  Iniciar sesión
                </button>
              )}
              <a href="https://wa.me/573172329884" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <MessageCircleMore className="h-5 w-5" />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="section-shell relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200">
              Soluciones digitales
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              Tecnología, servicios y soluciones para ti
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-300 md:text-lg">
              Servicios profesionales, atención rápida, precios competitivos y soporte personalizado.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#servicios" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-xl shadow-violet-500/30 transition hover:scale-[1.02]">
                Explorar servicios <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://wa.me/573172329884" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-violet-400/60 hover:bg-violet-500/10">
                Contactar por WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Atención ágil</span>
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Soporte personal</span>
            </div>
          </div>

          <div className="relative">
            <div className="soft-card floaty relative overflow-hidden rounded-[2rem] border border-white/10 p-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                  <span>Dashboard</span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">Online</span>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    ['Servicios activos', '24'],
                    ['Pedidos gestionados', '1.2k'],
                    ['Satisfacción', '96%'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
                      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -left-5 top-8 hidden h-24 w-24 rounded-full bg-violet-500/20 blur-2xl md:block" />
            <div className="absolute -right-3 bottom-6 hidden h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ services, loading, error }: { services: any[]; loading: boolean; error: string | null }) {
  if (loading) return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="soft-card p-8"><div className="flex items-center justify-center gap-3 text-slate-300"><span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" /> Cargando servicios...</div></div></div>;
  if (error) return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-100">{error}</div></div>;
  if (!services.length) return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center"><h3 className="text-lg font-semibold text-slate-100">No hay servicios disponibles</h3><p className="mt-2 text-sm text-slate-400">Pronto activaremos más soluciones para ti.</p></div></div>;

  return (
    <section id="servicios" className="section-shell px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
            Servicios
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Soluciones pensadas para crecer</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="group rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_24px_60px_rgba(109,40,217,0.22)]">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-200">
                  <span className="text-xl font-bold">{service.name.slice(0, 1)}</span>
                </div>
                {service.active ? <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">Activo</span> : <span className="rounded-full border border-slate-500/30 bg-slate-500/10 px-2 py-1 text-[10px] text-slate-300">Inactivo</span>}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{service.name}</h3>
              <p className="mt-3 text-sm text-slate-300">{service.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-base font-bold text-violet-200">{service.price}</span>
                <button className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-100 transition hover:bg-violet-500/20">
                  Consultar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  const items = [
    { title: '100% seguro', description: 'Procesos confiables con atención responsable y seguimiento claro.', icon: 'ShieldCheck' },
    { title: 'Atención rápida', description: 'Respuestas ágiles para mantener tus procesos en movimiento.', icon: 'Zap' },
    { title: 'Precios competitivos', description: 'Planes y costos ajustados a cada necesidad y presupuesto.', icon: 'BadgeDollarSign' },
    { title: 'Soporte personalizado', description: 'Acompañamiento cercano, profesional y adaptado a cada caso.', icon: 'Users' },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
            Beneficios
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Lo que te ayuda a decidir</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = iconLibrary[item.icon] ?? ShieldCheck;
            return (
              <div key={item.title} className="group rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_24px_60px_rgba(109,40,217,0.18)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-200 shadow-lg shadow-violet-900/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  const plans = [
    { name: 'Básico', description: 'Para consultas sencillas.', price: '$49.000', cta: 'Elegir plan' },
    { name: 'Profesional', description: 'Para clientes que necesitan más servicios.', price: '$119.000', cta: 'Elegir plan', popular: true },
    { name: 'Premium', description: 'Para atención completa y personalizada.', price: '$249.000', cta: 'Contactar' },
  ];

  return (
    <section id="precios" className="section-shell px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
            Precios
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Planes accesibles y claros</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={cn('rounded-[2rem] border p-6', plan.popular ? 'border-violet-400/60 bg-gradient-to-b from-violet-500/15 to-slate-900/70 shadow-[0_20px_60px_rgba(109,40,217,0.25)]' : 'border-white/10 bg-slate-900/70')}>
              {plan.popular ? <div className="mb-4 inline-flex rounded-full border border-violet-300/40 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200">Más popular</div> : null}
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-3 text-sm text-slate-300">{plan.description}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="pb-2 text-sm text-slate-400">/mes</span>
              </div>
              <button className={cn('mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-3 font-semibold text-white', plan.popular ? 'bg-gradient-to-r from-violet-500 to-cyan-500' : 'border border-white/10 bg-white/5 hover:bg-violet-500/10')}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    'Elige un servicio.',
    'Crea tu cuenta o inicia sesión.',
    'Realiza el pedido o pago.',
    'Recibe atención y seguimiento.',
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
            Proceso
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Así funciona</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="relative rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-lg font-bold text-violet-200">{index + 1}</div>
              <p className="text-base font-medium text-slate-100">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const items = [
    { question: '¿Qué servicios ofrecen?', answer: 'Ofrecemos soluciones digitales, soporte tecnológico, gestión de pedidos y atención por WhatsApp.' },
    { question: '¿Necesito crear una cuenta?', answer: 'Para acceder a pedidos y seguimiento sí es recomendable, aunque puedes pedir información sin hacerlo.' },
    { question: '¿Cómo puedo realizar un pedido?', answer: 'Elige el servicio y completa el proceso desde el perfil o contacta por WhatsApp.' },
    { question: '¿Cómo recargo mi saldo?', answer: 'Desde tu perfil puedes subir el comprobante para que sea revisado por el administrador.' },
    { question: '¿Cuánto tarda la atención?', answer: 'En general respondemos lo más rápido posible según la demanda y la complejidad del caso.' },
    { question: '¿Cómo contacto al soporte?', answer: 'Escríbenos al +57 317 232 9884 o usa el formulario de contacto de esta misma página.' },
  ];

  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Preguntas frecuentes</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <details key={index} className="group rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left open:border-violet-500/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white">
                {item.question}
                <ChevronDown className="h-5 w-5 text-violet-200 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 pr-8 text-sm leading-6 text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<'idle' | 'error' | 'success'>('idle');

  const handleChange = (field: 'name' | 'email' | 'message', value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!values.name.trim()) nextErrors.name = 'Ingresa tu nombre.';
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Ingresa un correo válido.';
    if (!values.message.trim() || values.message.trim().length < 10) nextErrors.message = 'El mensaje debe tener al menos 10 caracteres.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitState('error');
      return;
    }

    setSubmitState('success');
    setValues({ name: '', email: '', message: '' });
  };

  return (
    <section id="contacto" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-950/80 via-slate-900 to-slate-950 p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
              Contacto
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">¿Necesitas ayuda?</h2>
            <p className="mt-4 text-base text-slate-300">Recibe atención personalizada para resolver tus dudas o solicitar un servicio.</p>
            <div className="mt-6 space-y-4 text-sm text-slate-200">
              <p>WhatsApp: <a href="https://wa.me/573172329884" className="font-semibold text-violet-200">+57 317 232 9884</a></p>
              <p>Horario: Lunes a sábado · 8:00 AM – 7:00 PM</p>
            </div>
            <a href="https://wa.me/573172329884" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/30">
              <MessageCircleMore className="h-5 w-5" /> Contactar por WhatsApp
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-950/30 p-4 sm:p-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Nombre</label>
              <input value={values.name} onChange={(event) => handleChange('name', event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none" placeholder="Tu nombre" />
              {errors.name ? <p className="mt-2 text-xs text-rose-300">{errors.name}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Correo</label>
              <input type="email" value={values.email} onChange={(event) => handleChange('email', event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none" placeholder="tucorreo@ejemplo.com" />
              {errors.email ? <p className="mt-2 text-xs text-rose-300">{errors.email}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Mensaje</label>
              <textarea value={values.message} onChange={(event) => handleChange('message', event.target.value)} className="min-h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none" placeholder="¿En qué te podemos ayudar?" />
              {errors.message ? <p className="mt-2 text-xs text-rose-300">{errors.message}</p> : null}
            </div>
            <button type="submit" className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:scale-[1.01]">
              Enviar
            </button>
            {submitState === 'success' ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">Mensaje enviado correctamente. Pronto te contactaremos.</p> : null}
            {submitState === 'error' ? <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">Revisa los campos antes de enviar.</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-white">Servidor Uverley</h3>
          <p className="mt-3 text-sm text-slate-300">Soluciones digitales, atención rápida y soporte personalizado para crecer con confianza.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Enlaces rápidos</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><a href="#inicio" className="hover:text-white">Inicio</a></li>
            <li><a href="#servicios" className="hover:text-white">Servicios</a></li>
            <li><a href="#precios" className="hover:text-white">Precios</a></li>
            <li><a href="#faq" className="hover:text-white">Preguntas frecuentes</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Contacto</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><a href="https://wa.me/573172329884" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contacto">Soporte</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Legales</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Términos y condiciones</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Servidor Uverley. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export function LoginPanel({ onSubmit, onCancel }: { onSubmit: (email: string, password: string) => void; onCancel: () => void }) {
  const [email, setEmail] = useState('cliente@servidoruverley.com');
  const [password, setPassword] = useState('cliente123');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-violet-900/20">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Iniciar sesión</h3>
          <button onClick={onCancel} className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Correo</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Contraseña</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => onSubmit(email, password)} className="flex-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white">
              Entrar
            </button>
            <button onClick={onCancel} className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">
              Cancelar
            </button>
          </div>
          <p className="text-xs text-slate-400">Demo: cliente@servidoruverley.com / cliente123 o admin@servidoruverley.com / admin123</p>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-200">Perfil</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Hola, {user?.name}</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Información</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li><span className="text-slate-400">Correo:</span> {user.email}</li>
            <li><span className="text-slate-400">Rol:</span> {user.role}</li>
            <li><span className="text-slate-400">Saldo disponible:</span> ${user.balance.toLocaleString('es-CO')}</li>
          </ul>
          <button onClick={onLogout} className="mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">Cerrar sesión</button>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Historial de pedidos</h2>
          <div className="mt-4 space-y-3">
            {user.orders?.map((order: any) => (
              <div key={order.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                <div className="flex justify-between"><span>{order.service}</span><span className="text-violet-200">{order.status}</span></div>
                <div className="mt-2 text-xs text-slate-400">{order.date} · ${order.amount.toLocaleString('es-CO')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminPage({ user }: { user: any }) {
  if (user?.role !== 'admin') return <div className="mx-auto max-w-5xl px-4 py-20"><div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-100">No tienes permisos para ver este panel.</div></div>;

  const cards = [
    { label: 'Clientes', value: '128' },
    { label: 'Saldos', value: '$8.450.000' },
    { label: 'Pedidos', value: '18' },
    { label: 'Recargas pendientes', value: '7' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-200">Panel administrativo</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Resumen del negocio</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Gestión de servicios</h2>
          <div className="mt-4 space-y-3">
            {['Servicios digitales', 'Gestión de pedidos', 'Atención por WhatsApp'].map((service) => (
              <div key={service} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                <span>{service}</span>
                <button className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-200">Activo</button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Recargas pendientes</h2>
          <div className="mt-4 space-y-3">
            {['REC-102', 'REC-204', 'REC-187'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                <span>{item}</span>
                <div className="flex gap-2">
                  <button className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-200">Aprobar</button>
                  <button className="rounded-full bg-rose-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-rose-200">Rechazar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RouteNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-20 text-center">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-200">Error</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Página no encontrada</h1>
        <p className="mt-3 text-slate-300">La ruta que buscas no existe o fue movida.</p>
        <a href="/" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white">Volver al inicio</a>
      </div>
    </div>
  );
}
