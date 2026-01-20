# 🎓 QuestionPaperz.com

A premium, modern educational platform designed for students to share and access previous year question papers, entrance exam materials, and expert study notes. Built with a focus on speed, aesthetics, and community contribution.

---

## 🌟 Key Features

- **Dynamic Content Discovery**: Specialized sections for University Papers, Board Exams, Entrance Exams (JEE, NEET), and Study Notes.
- **Smart Search**: Intelligent search engine that filters by subject, board, class, or year.
- **Contribution System**: Frictionless document upload system with automatic title generation and PDF processing.
- **Personalized Dashboard**: Users can track their contributions and manage uploaded materials.
- **Bookmark System**: Save important documents for offline viewing or later reference with "Saved" states and optimistic UI updates.
- **Native Sharing**: One-tap sharing via the Web Share API (WhatsApp, Telegram, etc.) with clipboard fallback.
- **Interactive Previews**: High-performance built-in PDF viewer for instant document review.
- **Newsletter Engine**: Integrated subscription system to keep students updated on new materials.
- **Premium Mobile Experience**: Fully responsive "Mobile-First" design featuring native-style bottom sheets for authentication.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a sleek, modern UI.
- **Icons**: Lucide (React-icons), Font Awesome, and HeroIcons.
- **Animations**: Framer Motion & CSS keyframe animations.
- **State Management**: React Hooks & Context API.
- **Form Handling**: Formik & Yup for robust validation.

### Backend & Database
- **API**: Next.js Serverless Functions (API Routes).
- **ORM**: [Prisma](https://www.prisma.io/) (PostgreSQL).
- **Database**: [Supabase](https://supabase.com/) (Managed PostgreSQL).
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth integration.
- **File Storage**: Supabase Storage Buckets for PDF management.

### Deployment & DevOps
- **Hosting**: AWS EC2 (Ubuntu).
- **Process Manager**: PM2 for 24/7 uptime and zero-downtime restarts.
- **Reverse Proxy**: Nginx for optimized performance and port 80/443 routing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- A PostgreSQL database (e.g., Supabase)
- Google OAuth Credentials (for authentication)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd questionpapers
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root and add:
   ```text
   DATABASE_URL="your_db_url"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_secret"
   GOOGLE_CLIENT_ID="your_google_id"
   GOOGLE_CLIENT_SECRET="your_google_secret"
   SUPABASE_URL="your_supabase_url"
   SUPABASE_KEY="your_supabase_key"
   ```
4. Initialize the database:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

---

## ☁️ Deployment

For automated deployment on **AWS EC2**, simply use the provided setup script:
```bash
./start.sh
```
*Make sure to update your `.env` variables with production values (e.g., Public IP) before running.*

---

## 📄 License
Developed for students, by students. Part of the QuestionPaperz open-contribution community.
