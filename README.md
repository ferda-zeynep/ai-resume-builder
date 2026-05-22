🚀 AI Resume Builder
An intelligent full-stack application that leverages AI to help users build professional, ATS-friendly resumes in minutes. Built with Next.js 14, this platform offers a seamless experience from data entry to PDF export.

🔗 Live Demo
[Vercel Linkini Buraya Yapıştır]

📝 Project Description
This project was designed to simplify the resume-building process. By integrating AI models, the application suggests professional summaries and work experience bullet points based on the user's job title, ensuring a high-quality output tailored for the modern job market.

✨ Features
🤖 AI-Powered Writing: Generate professional summaries and job descriptions using Hugging Face AI models.

🎨 Dynamic Templates: Choose between Modern, Minimal, and Professional layouts.

🔐 Secure Authentication: User sign-in and profile management via Clerk.

🌗 Dark & Light Mode: Seamless transition between themes with next-themes.

📊 Dashboard & Management: Track resume count, token usage, and download history.

🎨 Personalization: Change theme colors and layouts in real-time.

📄 PDF Export: Download high-quality PDF versions of your resume instantly.

⚡ Performance: Fast and responsive UI built with Tailwind CSS and Shadcn UI.

🛠️ Tech Stack
Framework: Next.js 14 (App Router)

Language: TypeScript

Database: PostgreSQL (via Prisma ORM)

Authentication: Clerk

AI Integration: Hugging Face Inference API

Styling: Tailwind CSS + Shadcn UI

Icons: Lucide React

🚀 Installation & Setup
Clone the repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Install dependencies:
npm install

Environment Variables:
Create a .env file in the root directory and add your keys:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
DATABASE_URL=your_postgres_url
HUGGINGFACE_API_KEY=your_key

Database Sync:
npx prisma generate
npx prisma db push

Run the app:
npm run dev

Developed with by Ferda Zeynep Çapa 🚀
