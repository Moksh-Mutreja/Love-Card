# Send a Love Card

## 💌 Idea Title

**Send a Love Card** - A romantic, themeable digital greeting card application for expressing feelings with style and playfulness.

---

## 📝 Idea Description

Send a Love Card is a modern web application that allows users to create, customize, and share beautiful digital love cards. Recipients can respond with their feelings (Yes, No, or Maybe) through an interactive interface featuring a playful "runaway No button" that adds a fun, viral element to the experience.

**Key Features:**

- 🎨 Themeable card designs with multiple color schemes
- 💌 Email notifications for responses
- 🎵 Spotify integration for adding songs to cards
- 🎉 Confetti animations on "Yes" responses
- 🏃 Playful runaway "No" button with 7 escape attempts
- 📱 Mobile-responsive design
- 🔒 Privacy controls (public/private cards)
- 📊 Response tracking with timestamps

---

## 🛠️ Technical Details

### **Frontend Technologies**

- **Framework:** Next.js 16.1.6 (App Router)
- **UI Library:** React 19.2.3
- **Styling:** Tailwind CSS 4
- **Animation:** Motion (Framer Motion v12)
- **Icons:** Lucide React
- **Confetti Effects:** canvas-confetti
- **Validation:** Zod

### **Backend Technologies**

- **Runtime:** Node.js
- **ORM:** Drizzle ORM 0.45.1
- **Database Driver:** Postgres 3.4.8
- **Server Actions:** Next.js Server Actions
- **Type Safety:** TypeScript 5

### **Database**

- **Provider:** Supabase (PostgreSQL)
- **Tables:** cards (UUID, names, message, responses, metadata)

### **3rd Party Services**

- **Email Service:** Resend (onboarding@resend.dev)
- **Hosting:** Vercel
- **Version Control:** GitHub
- **Database Hosting:** Supabase

### **Architecture Overview**

```
┌─────────────────────────────────────┐
│         Vercel (Hosting)            │
├─────────────────────────────────────┤
│  Next.js App Router (SSR/SSG)       │
│  ├─ React Components                │
│  ├─ Server Actions                  │
│  └─ API Routes                      │
├─────────────────────────────────────┤
│  Supabase PostgreSQL Database       │
│  └─ Cards Table (Relationships)     │
├─────────────────────────────────────┤
│  Resend Email Service               │
│  └─ Notification Emails             │
└─────────────────────────────────────┘
```

---

## 📋 Setup & Installation

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Git
- Supabase account
- Resend account

### **Step 1: Install Dependencies**

```bash
npm install
```

### **Step 2: Configure Environment Variables**

Create a `.env.local` file in the root directory:

```bash
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Step 3: Set Up Database**

Generate and run database migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

This creates the `cards` table with the following schema:

- `id` (UUID, primary key)
- `creatorName`, `recipientName`, `message`
- `theme`, `spotifyUrl`
- `creatorEmail`, `question`, `response`
- `respondedAt`, `isPublic`, `createdAt`

### **Step 4: Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### **Step 5: Build for Production**

```bash
npm run build
npm run start
```

---

## 🚀 Deployment

### **Deploy on Vercel (Recommended)**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Add environment variables in Vercel Settings
5. Deploy with one click
6. Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
7. Trigger redeploy for changes to take effect

See [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview) for detailed instructions.

---

## 📦 Project Structure

```
love-card-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── actions/
│   │   │   └── cards.ts
│   │   ├── api/
│   │   │   └── cards/[id]/route.ts
│   │   ├── card/[id]/page.tsx
│   │   ├── create/page.tsx
│   │   └── share/[id]/page.tsx
│   ├── components/
│   │   ├── ResponseButtons.tsx
│   │   ├── EscapingNoButton.tsx
│   │   ├── SharePageView.tsx
│   │   ├── CreateCardPage.tsx
│   │   ├── CardPageView.tsx
│   │   ├── LandingPage.tsx
│   │   ├── ThemePicker.tsx
│   │   └── ...
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   └── lib/
│       ├── base-url.ts
│       ├── resend.ts
│       ├── supabase.ts
│       └── themes.ts
├── public/
├── .env.local (not committed)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔑 Key Features Explained

### **1. Escaping No Button**

The "No" button escapes from the cursor when approached (within 120px), making the user chase it. After 7 escape attempts, it returns to its original position, allowing normal interaction.

### **2. Email Notifications**

When a recipient responds to a card, the creator receives an email with:

- The response (Yes/No/Maybe)
- The original message
- A clickable link to view the card

### **3. Themeable Cards**

Users can choose from multiple predefined themes that style the card appearance with different color schemes and visual effects.

### **4. Response Tracking**

All responses are recorded in the database with timestamps, allowing creators to see when and how recipients answered.

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## 🧪 Testing

### **Local Testing**

```bash
npm run dev
# Test all features locally before deployment
```

### **Production Testing**

After deployment to Vercel:

1. Create a test card
2. Verify the share link works
3. Test responses (Yes, No, Maybe)
4. Check email notifications
5. Test on mobile devices

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)

---

## 🔗 Submission Links

- **GitHub Repository:** [https://github.com/Moksh-Mutreja/Love-Card](https://github.com/Moksh-Mutreja/Love-Card)
- **Live Demo (under progress):** [https://love-confession-cards.vercel.app](https://love-confession-cards.vercel.app)
- **Pitch+Demo:** [Google Drive Link](https://drive.google.com/file/d/1NaMovvY5zj4Eyoyg5tTtxUWd8CfIdmTl/view?usp=sharing)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Moksh Mutreja**

- GitHub: [@Moksh-Mutreja](https://github.com/Moksh-Mutreja)

---
