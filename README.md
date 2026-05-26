# Portfolio Website - Md Ashik Alam

A modern, responsive, and professional developer portfolio website built with Next.js 14 (App Router) and Tailwind CSS.

## Features

- 🎨 Modern, clean, and elegant design
- 🌓 Dark/Light mode toggle
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔍 SEO optimized with meta tags and Open Graph
- ⚡ Fast performance with Next.js App Router
- 🎯 All sections: Home, About, Experience, Projects, Skills, Education, Achievements, and Contact

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── ThemeProvider.tsx   # Dark/Light mode context
│   ├── Navigation.tsx      # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Experience.tsx      # Experience section
│   ├── Projects.tsx        # Projects section
│   ├── Skills.tsx          # Skills section
│   ├── Education.tsx       # Education section
│   ├── Achievements.tsx    # Achievements section
│   └── Contact.tsx         # Contact section
└── public/                 # Static assets
```

## Customization

To customize the portfolio with your own information:

1. Update personal information in `components/Hero.tsx`
2. Modify experience data in `components/Experience.tsx`
3. Update projects in `components/Projects.tsx`
4. Adjust skills in `components/Skills.tsx`
5. Update education details in `components/Education.tsx`
6. Modify achievements in `components/Achievements.tsx`
7. Update SEO metadata in `app/layout.tsx`

## License

This project is open source and available under the MIT License.

