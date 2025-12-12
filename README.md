# Portfolio Website - Mario Sitepu

A modern, responsive portfolio website built with Next.js 16, featuring bilingual support (English/Indonesian), smooth animations, and a beautiful UI design.

## 🚀 Features

- **Next.js 16** with React 19 and React Compiler
- **Bilingual Support** - English & Indonesian with smooth language switching
- **Modern UI** built with Tailwind CSS 4 and shadcn/ui components
- **Smooth Animations** using Motion (Framer Motion)
- **Dark Mode** with elegant theme transitions
- **Responsive Design** - Fully optimized for mobile and desktop
- **Interactive Carousel** for project showcase
- **Skills Showcase** with animated cards
- **Glassmorphism Effects** for modern visual appeal
- **Type-Safe** with TypeScript

## 📋 Prerequisites

Before running, ensure you have:

- **Node.js 18+** or **Bun** runtime
- **npm** or **bun** package manager

## 🛠️ Getting Started

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/MarioSitepu/my-porto-web.git
cd my-porto-web

# Install dependencies
bun install
# or
npm install
```

### Step 2: Run Development Server

```bash
# Start development server
bun dev
# or
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

### Step 3: Build for Production

```bash
# Build the application
bun run build
# or
npm run build

# Start production server
bun run start
# or
npm run start
```

## 🎨 Customization

### Update Your Information

Edit `src/config.ts` to customize:

- **Personal Information**: Name, title, bio, avatar
- **Social Links**: GitHub, email, Instagram
- **Projects**: Add your projects with images and descriptions
- **Skills**: Add or remove technologies you work with

### Change Colors & Styling

Edit `src/app/globals.css` to customize:

- Color scheme (light/dark mode)
- Typography
- Spacing and layout
- Custom animations

## 🛠 Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with React Compiler
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible component primitives
- **Motion** (Framer Motion) - Smooth animations

### Features
- **next-themes** - Dark mode support
- **Embla Carousel** - Carousel component
- **React Icons** - Icon library
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

## 📱 Pages

- **Home** - Main landing page with project carousel and skills showcase
- **About** - Personal information and bio
- **Projects** - Portfolio projects showcase
- **Skills** - Technologies and tools grid
- **Contact** - Contact information and links

## 🌐 Internationalization

The website supports two languages:

- **English (en)** - Default language
- **Indonesian (id)** - Full translation support

Language preference is saved in localStorage and persists across sessions.

## 🎯 Key Features

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Stagger animations for lists
- Parallax effects on carousel
- Text animations on language change

### Design
- Glassmorphism effects
- Gradient overlays
- Modern card designs
- Responsive grid layouts
- Smooth scroll behavior

### Performance
- Optimized images with Next.js Image
- Code splitting
- Lazy loading
- Fast page loads

## 📦 Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── (home)/      # Home route group
│   └── layout.tsx   # Root layout
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Custom components
├── contexts/         # React contexts
│   └── language-context.tsx
├── locales/         # Translation files
│   ├── en.ts
│   └── id.ts
├── modules/         # Feature modules
│   └── home/        # Home page components
├── config.ts        # Site configuration
└── lib/             # Utility functions
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure environment variables (if needed)
4. Deploy automatically on push

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to:

- **Netlify**
- **Cloudflare Pages**
- **AWS Amplify**
- **Any Node.js hosting provider**

## 🎨 Design Credits

Design inspired by [Hanssen Template](https://templates.gola.io/template/hanssen) by Pawel Gola.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Mario Sitepu**

- GitHub: [@MarioSitepu](https://github.com/MarioSitepu)
- Email: stinart123@gmail.com
- Instagram: [@mario_stp_](https://instagram.com/mario_stp_)

---

**Built with ❤️ using Next.js and modern web technologies**
