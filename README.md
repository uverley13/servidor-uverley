# Servidor Uverley

Sitio profesional de servicios digitales construido con React, TypeScript, Vite, Tailwind CSS y Lucide React.

## Desarrollo

```bash
npm install
npm run dev
```

## Verificación y producción

```bash
npm run typecheck
npm run build
```

El build se genera en `dist/client`, listo para Netlify. Copia `.env.example` a `.env.local` para activar Supabase; sin esas variables la interfaz funciona en modo demo local.

## Usuarios demo

- Cliente: `cliente@servidoruverley.com` / `cliente123`
- Administrador: `admin@servidoruverley.com` / `admin123`

Estas credenciales son únicamente para la demo local. En producción se debe usar Supabase Auth y políticas RLS.
