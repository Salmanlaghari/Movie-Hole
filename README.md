# 🍿 Movie Hole

> **Hop in. Binge out.**
> *The ultimate, premium-grade discovery wormhole for cinematic masterpieces.*

Welcome to **Movie Hole**, an immersive, high-fidelity, and cheekily premium movie discovery web application. Designed for cinephiles who want to dive deep into custom curated lists, discover movies by their distinct visual genre flavors, and collect their top candidate binging material directly inside their own personal "Hole".

---

## 🎨 Why Movie Hole? (The Brand Story)

Traditional movie applications are often dark and boxy, designed around rigid grids with no sense of motion or flavor. **Movie Hole** was built to break that mold.

The name is a playful nod to falling down "rabbit holes" of midnight movie binging. The brand combines a **warm signature gold** (`#E4B343`) representing retro projector lights and buttered kernels, with a **popcorn red** accent (`#E11D48`) denoting seats and cinematic urgency. Every pixel is intentional, fluid, and crafted to deliver a "10/10" premium feel through custom Framer Motion dynamics, immersive glass overlays, and a slightly cheeky brand voice that makes movie discovery feel less like a database search and more like an adventure.

---

## ✨ Features

- **🎬 Dynamic Hero Showcase**: A full-bleed cinema backdrop slider that crossfades every 7 seconds, displaying top-tier, high-fidelity releases with full ratings, categories, and direct action triggers.
- **🍿 Interactive Spotlight Spotlight Glows**: Move your cursor over movie cards to see a real-time reactive radial-spotlight overlay.
- **➕ "My Hole" Favorites**: Save movies seamlessly using client-side `localStorage`. Removing favorites triggers an elegant Framer Motion spring list rearrangement.
- **🔍 Full-Screen Search Modal**: Tap the search icon from any page to enter a fully-blurred backdrop overlay. Includes autofocus, debouncing (300ms), recent search tags, dynamic results, and helpful "Empty Popcorn Bucket" states.
- **🎭 Genre Filter Wheel**: Grid of custom genre cards, each boasting a signature color gradient. Clicking a genre category reveals a filtered, animated list of corresponding movies.
- **🎥 Floating Cinema Poster Detail Page**: Overlapping floating sticky posters with circular cast member lists, complete with hover tooltips, full overviews, and lazily rendered trailer iframe modals.
- **🚀 Hand-Crafted TMDB Mock Fallback**: Don't have a TMDB key ready? No problem! The application automatically falls back to hand-selected, high-fidelity mock data (e.g., *Interstellar*, *Dune*, *Oppenheimer*) to guarantee an immediate, premium out-of-the-box experience.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animation Engine**: Framer Motion (Transitions, Staggered lists, Underline layouts, and Hover effects)
- **Icons**: Lucide React Icons
- **Toast Notifications**: Sonner
- **Database**: LocalStorage (Zero-backend client persistence)
- **API**: TMDB API (Optional, with elegant full mock fallback)

---

## 🚀 Setup & Installation

### 1. Clone the repository
Make sure you are on the `feat/movie-hole-premium` branch.

### 2. Add Environment Variables
Create a `.env.local` file in the root directory (or copy `.env.example`):

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

*Note: If no key is supplied, Movie Hole automatically enters premium Mock Mode with exquisite preset binging titles.*

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📂 Codebase Architecture

```text
/app              # Next.js routes (Page Router / Layout setups)
  /favorites      # "My Hole" favorites dynamic grid page
  /genres         # Interactive multi-gradient genre category page
  /movie/[id]     # Detailed cinematic movie overview page
  globals.css     # Design system, premium custom scrollbars & shimmer animations
  layout.tsx      # Global layouts (Header/Nav, Footer, Search triggers)
  page.tsx        # Homepage (Hero Showcase & 5 snap-scroll Movie rows)
/components
  /brand          # Monogram & wordmark logo
  /effects        # PageTransitions & Smooth scrolling effects
  /layout         # responsive Glass Navbar, Footer & Search Modal
  /movies         # MovieRow, MovieCard, Hero, TrailerModal, and client managers
/hooks            # useFavorites client state, useSearchModal triggers, useDebounce
/lib              # tmdb.ts server-side client with mock fallbacks
/types            # Strict TypeScript movie, cast, and video interface definitions
```

---

## 🏆 Credits & Attribution

- Icons: [Lucide React](https://lucide.dev)
- Motion effects: [Framer Motion](https://framer.com/motion)
- Database & metadata: [The Movie Database (TMDB)](https://www.themoviedb.org)
- Design & execution: **Jules** (Software Engineer)
