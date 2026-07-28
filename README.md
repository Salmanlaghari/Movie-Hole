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

---

## 📱 Android Release Signing & CI/CD Workflow

Movie Hole supports compilation and packaging into Android Hybrid Release packages (Release APK & AAB). This pipeline is fully automated and secured.

### 🔑 Release Keystore Fingerprints

The production keystore for `ai-browser` alias has been generated. Use the following documented fingerprints for Google Play Console, AdMob, and API service registrations:

- **Keystore File**: `release.keystore`
- **Alias Name**: `ai-browser`
- **SHA-1 Fingerprint**: `8C:68:D5:58:15:E4:83:E6:15:0C:66:64:C1:FB:0D:EA:07:65:B8:ED`
- **SHA-256 Fingerprint**: `BD:EB:24:ED:95:B3:5F:C3:8B:3B:A9:75:4F:45:A2:CE:BB:DD:1E:C2:B9:86:70:A4:59:28:83:DA:3D:3E:DE:56`
- **MD5 Fingerprint**: `6B:A2:81:42:15:CC:F3:D5:08:92:B3:D9:E2:E3:64:FF`

---

### 🚀 CI/CD secrets configuration

To run the automated mobile signing workflow inside GitHub Actions, ensure you add the following secrets to your GitHub Repository Settings (`Settings -> Secrets and variables -> Actions`):

1. `KEYSTORE_FILE`: The base64-encoded string of your `release.keystore` file.
   * *To generate this string, run: `base64 release.keystore | tr -d '\n'` and copy the output.*
2. `KEYSTORE_PASSWORD`: The password of the generated keystore (default: `moviehole123`).
3. `KEY_ALIAS`: The key alias used inside the keystore (default: `ai-browser`).
4. `KEY_PASSWORD`: The key password (default: `moviehole123`).

Once configured, any push to `main` or `feat/movie-hole-premium` automatically triggers the action to compile, sign, verify, and upload the resulting production packages!
