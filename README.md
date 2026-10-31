<p align="center">
  <img src="./public/deal-drop-logo.png" alt="DealDrop logo" height="70" />
</p>

<h3 align="center">Never miss a price drop.</h3>

<p align="center">
  Track prices from any e-commerce site and get an email alert the moment a price falls.
</p>

<p align="center">
  <a href="https://trydealdrop.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-trydealdrop.vercel.app-FA5D19?style=for-the-badge&logo=vercel&logoColor=white"></a>
</p>

---

## 📖 About

DealDrop is a full-stack price tracking app. Paste a product link from an e-commerce site, and DealDrop extracts the product name, price, currency and image, saves it to your account and keeps track of how the price changes over time. A scheduled price check runs in the background and emails you when a tracked product gets cheaper.

I built this to learn how to combine AI-powered web scraping, authentication, a database and automated background jobs in one Next.js application.

## ✨ Features

- 🔐 Sign in with Google using Supabase Auth, with each user's products kept private
- 🔗 Add any product URL; details are extracted automatically with Firecrawl
- 📈 Price history chart for every tracked product
- 🔔 Automated price checks with an email alert when the price drops (includes old price, new price and percentage drop)
- 🗑️ Add, view and remove tracked products from one dashboard

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router), React |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Database & Auth | Supabase (PostgreSQL), Google OAuth |
| Web scraping | Firecrawl API |
| Email alerts | Resend |
| Charts | Recharts |
| Deployment | Vercel |

## ⚙️ How It Works

1. The user signs in with Google and pastes a product URL.
2. A server action sends the URL to **Firecrawl**, which returns the product name, price, currency and image.
3. The product is saved in **Supabase**, and each price change is stored in a `price_history` table.
4. A secured endpoint (`POST /api/cron/check-prices`, protected by a secret token) re-scrapes every tracked product.
5. If a price dropped, the user gets an email through **Resend**.

## 📸 Screenshots

<p align="center">
  <img src="./screenshots/home.png" alt="DealDrop home page" width="48%" />
  <img src="./screenshots/signin.png" alt="Sign in with Google" width="48%" />
</p>

## 🚀 Run Locally

```bash
git clone https://github.com/srishty02/dealdrop.git
cd dealdrop
npm install
```

Create a `.env.local` file in the root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender_email
CRON_SECRET=any_random_secret_string
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👩‍💻 Author

**Srishty Kumari**
[LinkedIn](https://www.linkedin.com/in/srishty-kumari-14b56b272/) · [GitHub](https://github.com/srishty02) · srishty0208@gmail.com
