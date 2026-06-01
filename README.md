# RENZY Academy - PMI-ACP Certification Training Platform

A modern, responsive website for RENZY Academy's PMI-ACP certification training program built with TanStack Start, React 19, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: TanStack Start, React 19, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with modern CSS
- **Enrollment System**: Interactive enrollment form with modal support
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Fast Performance**: Optimized with Vite build system
- **Type Safe**: Full TypeScript support

## 📋 Project Structure

```
src/
├── routes/                 # File-based routing (TanStack Router)
│   ├── __root.tsx         # App shell/root layout
│   ├── index.tsx          # Home page
│   └── README.md          # Routing documentation
├── styles.css             # Global styles with CSS variables
├── router.tsx             # Router configuration
├── server.ts              # SSR server setup
└── start.ts               # Application entry point
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ (or Bun)
- npm/yarn/pnpm or Bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Dalink-s-Nig-LTD/RENZY-ACADEMY.git
cd RENZY-ACADEMY

# Install dependencies
bun install
# or npm install / yarn install / pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Development

```bash
# Start dev server
bun run dev
# or npm run dev

# Open in browser
# http://localhost:5173
```

### Production Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

## 🔧 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run build:dev` - Build with development mode
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier

## 📁 Key Files

- **tailwind.config.ts** - Tailwind CSS configuration with Renzy brand colors
- **.env.example** - Environment variables template
- **tsconfig.json** - TypeScript configuration
- **vite.config.ts** - Vite build configuration
- **eslint.config.js** - ESLint rules and configuration

## 🎨 Customization

### CSS Variables

Update the color scheme in `src/styles.css`:

```css
:root {
  --r-primary: #002B5C;
  --r-accent: #E31B23;
  --r-text: #1F2937;
  /* ... more variables */
}
```

### Environment Variables

Configure in `.env.local`:

```
VITE_API_URL=http://localhost:5173
VITE_PHONE=+234 901 069 2401
VITE_EMAIL=info@renzyacademy.com
VITE_ENABLE_FORM_SUBMISSION=true
```

## 📱 Sections

- **Navigation** - Logo and enrollment CTA button
- **Hero** - Main value proposition with stats
- **Benefits** - Why PMI-ACP matters
- **Industries** - Sectors where PMI-ACP is in demand
- **Audience** - Target professional roles
- **Testimonials** - Student success stories
- **CTA** - Call-to-action for enrollment
- **Footer** - Contact information

## 🚀 Deployment

Configured for **Vercel** deployment via Nitro.

```bash
bun run build
# Deploy the dist folder to Vercel
```

## 🔗 Links

- **Live Site**: https://renzy-academy.vercel.app
- **GitHub**: https://github.com/Dalink-s-Nig-LTD/RENZY-ACADEMY

## 📄 License

All rights reserved © 2026 Renzy Academy

## 👥 Support

For support, contact:
- 📞 Phone: +234 901 069 2401
- 📧 Email: info@renzyacademy.com
- 💬 WhatsApp: https://wa.me/2349010692401
