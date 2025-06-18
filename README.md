# ONICLOTH Store

A modern, responsive e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. This project showcases a premium clothing store with advanced features like PWA support, dark mode, and comprehensive state management.

![ONICLOTH Store](https://img.shields.io/badge/ONICLOTH-Premium%20Clothing-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC)

## 🚀 Features

- **Modern E-commerce**: Complete shopping experience with cart, checkout, and product management
- **Progressive Web App (PWA)**: Installable app with offline capabilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Theme switching with next-themes
- **Type Safety**: Full TypeScript implementation
- **State Management**: Zustand for global state management
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling
- **Code Quality**: ESLint, Prettier, and Husky for code standards
- **Commit Standards**: Conventional commits with commitizen

## 🛠️ Tech Stack

### Core Framework

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript** - Type-safe JavaScript

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Material-UI** - Additional UI components
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variant management

### State Management & Data

- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Recharts** - Data visualization

### User Experience

- **Next PWA** - Progressive Web App features
- **Next Themes** - Dark/light mode switching
- **NextJS Toploader** - Loading indicators
- **Sonner** - Toast notifications
- **Embla Carousel** - Touch-friendly carousels
- **React Multi Carousel** - Additional carousel options

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitizen** - Conventional commits
- **Commitlint** - Commit message validation

## 📁 Project Structure

```
clothing-ecommerce/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart pages
│   ├── checkout/          # Checkout flow
│   ├── product/           # Product pages
│   ├── shop/              # Shop/category pages
│   ├── profile/           # User profile
│   ├── signin/            # Authentication
│   └── join/              # Registration
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── cart/             # Cart-related components
│   ├── shop/             # Shop components
│   └── profile/          # Profile components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── contexts/             # React contexts
├── providers/            # Context providers
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── assets/               # Project assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/julianoalves/onicloth.git
   cd onicloth
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically

# Git & Commits
npm run commit       # Interactive commit with commitizen
npm run commitlint   # Validate commit messages
```

## 🎨 Styling & Theming

The project uses Tailwind CSS with a custom design system:

- **Colors**: Custom color palette with dark/light variants
- **Typography**: Consistent font hierarchy
- **Components**: Radix UI primitives styled with Tailwind
- **Animations**: Tailwind CSS animations and transitions

### Dark Mode

Toggle between light and dark themes using the theme provider. The theme preference is persisted in localStorage.

## 📱 PWA Features

- **Installable**: Add to home screen on supported devices
- **Offline Support**: Basic offline functionality
- **Service Worker**: Automatic caching and updates
- **Manifest**: App metadata and icons

## 🔧 Development Workflow

### Code Standards

- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Pre-commit hooks

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: bug fix
docs: documentation update
style: formatting changes
refactor: code refactoring
perf: performance improvements
test: add or update tests
chore: maintenance tasks
```

### Git Hooks

- **pre-commit**: Runs ESLint before commit
- **commit-msg**: Validates commit message format

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance

- **Lighthouse Score**: Optimized for performance, accessibility, and SEO
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`npm run commit`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Juliano Alves**

- GitHub: [@julianoalvescode](https://github.com/julianoalvescode)
- Website: [onicloth.store](https://onicloth.store/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Vercel](https://vercel.com/) for hosting and deployment

---

⭐ If you found this project helpful, please give it a star!
