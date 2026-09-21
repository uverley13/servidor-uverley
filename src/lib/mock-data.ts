export const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Precios', href: '#precios' },
  { label: 'Preguntas frecuentes', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export const services = [
  {
    id: 'digital-services',
    name: 'Servicios digitales',
    description: 'Soluciones para negocio, presencia online y optimización web.',
    price: 'Desde $35.000',
    icon: 'MonitorSmartphone',
    active: true,
  },
  {
    id: 'mobile-support',
    name: 'Soporte para dispositivos móviles',
    description: 'Reparación, configuración y asesoría para celulares y tablets.',
    price: 'Desde $25.000',
    icon: 'Smartphone',
    active: true,
  },
  {
    id: 'order-management',
    name: 'Gestión de pedidos',
    description: 'Organiza ventas, stock y seguimiento con mayor control.',
    price: 'Desde $45.000',
    icon: 'PackageCheck',
    active: true,
  },
  {
    id: 'personal-assistance',
    name: 'Asistencia personalizada',
    description: 'Atención humana y acompañamiento para resolver dudas rápidas.',
    price: 'Consultar',
    icon: 'Headset',
    active: true,
  },
  {
    id: 'tech-setup',
    name: 'Configuración tecnológica',
    description: 'Instalación, ajustes y personalización según tu negocio.',
    price: 'Desde $60.000',
    icon: 'Settings2',
    active: true,
  },
  {
    id: 'whatsapp-support',
    name: 'Atención por WhatsApp',
    description: 'Respuesta inmediata para seguimiento y coordinación.',
    price: 'Disponible',
    icon: 'MessageCircleMore',
    active: true,
  },
];

export const benefits = [
  {
    title: '100% seguro',
    description: 'Procesos confiables con atención responsable y seguimiento claro.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Atención rápida',
    description: 'Respuesta ágil para resolver solicitudes y mantener el flujo.',
    icon: 'Zap',
  },
  {
    title: 'Precios competitivos',
    description: 'Planes pensados para distintos niveles de demanda y presupuesto.',
    icon: 'BadgeDollarSign',
  },
  {
    title: 'Soporte personalizado',
    description: 'Acompañamiento cercano para cada necesidad o proyecto.',
    icon: 'Users',
  },
];

export const pricingPlans = [
  {
    name: 'Básico',
    description: 'Para consultas sencillas.',
    price: '$49.000',
    cta: 'Elegir plan',
  },
  {
    name: 'Profesional',
    description: 'Para clientes que necesitan más servicios.',
    price: '$119.000',
    cta: 'Elegir plan',
    popular: true,
    highlight: true,
  },
  {
    name: 'Premium',
    description: 'Para atención completa y personalizada.',
    price: '$249.000',
    cta: 'Contactar',
  },
];

export const processSteps = [
  'Elige un servicio.',
  'Crea tu cuenta o inicia sesión.',
  'Realiza el pedido o pago.',
  'Recibe atención y seguimiento.',
];

export const faqItems = [
  {
    question: '¿Qué servicios ofrecen?',
    answer: 'Ofrecemos soluciones digitales, soporte técnico, gestión de pedidos, configuración y atención por WhatsApp.',
  },
  {
    question: '¿Necesito crear una cuenta?',
    answer: 'No siempre. Puedes consultar sin registro, pero para pedir servicios y hacer seguimiento sí es recomendable iniciar sesión.',
  },
  {
    question: '¿Cómo puedo realizar un pedido?',
    answer: 'Puedes elegir un servicio desde la sección de servicios y completar la solicitud desde tu perfil o WhatsApp.',
  },
  {
    question: '¿Cómo recargo mi saldo?',
    answer: 'Desde tu perfil puedes enviar el comprobante de pago y el administrador lo revisará para aprobar o rechazar la recarga.',
  },
  {
    question: '¿Cuánto tarda la atención?',
    answer: 'Normalmente respondemos muy rápido, y la atención varía según la complejidad del servicio solicitado.',
  },
  {
    question: '¿Cómo contacto al soporte?',
    answer: 'Puedes escribir por WhatsApp al número +57 317 232 9884 o usar el formulario de contacto en esta página.',
  },
];

export const defaultUsers = [
  {
    id: 'admin-1',
    name: 'Administrador',
    email: 'admin@servidoruverley.com',
    password: 'admin123',
    role: 'admin',
    balance: 0,
    orders: [
      { id: 'PED-1001', service: 'Servicios digitales', status: 'Procesando', amount: 65000, date: '2026-09-15' },
      { id: 'PED-1002', service: 'Atención por WhatsApp', status: 'Completado', amount: 30000, date: '2026-09-12' },
    ],
    rechargeHistory: [{ id: 'REC-1', amount: 200000, status: 'Aprobado', date: '2026-09-10' }],
  },
  {
    id: 'cliente-1',
    name: 'Cliente Demo',
    email: 'cliente@servidoruverley.com',
    password: 'cliente123',
    role: 'cliente',
    balance: 125000,
    orders: [
      { id: 'PED-2001', service: 'Soporte para dispositivos móviles', status: 'Pendiente', amount: 35000, date: '2026-09-18' },
      { id: 'PED-2002', service: 'Gestión de pedidos', status: 'Completado', amount: 75000, date: '2026-09-14' },
    ],
    rechargeHistory: [{ id: 'REC-2', amount: 100000, status: 'Aprobado', date: '2026-09-11' }],
  },
];
