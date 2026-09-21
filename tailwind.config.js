@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background-color: #030712;
  color: #e5eefb;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(88, 80, 236, 0.18), transparent 30%),
    radial-gradient(circle at top right, rgba(56, 189, 248, 0.12), transparent 20%),
    #030712;
  color: #edf2ff;
}

* {
  box-sizing: border-box;
}

#root {
  min-height: 100vh;
}

img {
  max-width: 100%;
  display: block;
}

button,
input,
textarea {
  font: inherit;
}

::selection {
  background: rgba(96, 165, 250, 0.35);
}

.glass {
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.gradient-text {
  background: linear-gradient(90deg, #7dd3fc 0%, #c084fc 45%, #8b5cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.soft-card {
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.4);
}

.section-shell {
  position: relative;
  overflow: hidden;
}

.section-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.12), transparent 50%);
  pointer-events: none;
}

@keyframes floaty {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.floaty {
  animation: floaty 6s ease-in-out infinite;
}
