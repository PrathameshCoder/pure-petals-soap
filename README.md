<div align="center">

# 🌿 Pure Petals

### Pure ingredients. Thoughtful rituals. Soap made slowly.

A refined, responsive storefront for Pure Petals—featuring handcrafted soaps, an interactive soap finder, a shopping bag, and a Resend-powered contact experience.

</div>

---

## About

Pure Petals is a modern skincare storefront inspired by botanical ingredients, slow rituals, and thoughtful design.

The website presents the complete soap collection while helping visitors discover the right bar for their skin through a quick, personalized quiz.

## Features

- Responsive botanical storefront
- Interactive soap collection
- Animated soap previews
- Newly launched product highlighting
- 15-second personalized Soap Finder
- Expandable product stories and ingredients
- Functional shopping bag
- Contact and newsletter form
- Resend email and contact integration
- Custom three-petal branding and favicon
- Accessible keyboard and reduced-motion support
- Vercel-ready Next.js backend

## Built with

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Resend](https://resend.com/)
- [Lucide Icons](https://lucide.dev/)
- [pnpm](https://pnpm.io/)

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure the environment

Copy `.env.example` to a new `.env.local` file and replace the placeholders:

```env
RESEND_API_KEY=re_your_api_key
RESEND_CONTACT_TO=your-email@example.com
RESEND_FROM_EMAIL="Pure Petals <hello@your-verified-domain.com>"
RESEND_NEWSLETTER_SEGMENT_ID=
```

`RESEND_NEWSLETTER_SEGMENT_ID` is optional. Never commit `.env.local` or expose your Resend API key publicly.

### 3. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

```bash
pnpm dev        # Start the development server
pnpm build      # Create a production build
pnpm start      # Run the production build
pnpm typecheck  # Check TypeScript
```

## Project structure

```text
app/
├── api/contact/       # Resend contact and newsletter backend
├── globals.css        # Global design system and animations
├── layout.tsx         # Website metadata and layout
└── page.tsx           # Main page

components/
├── cart/              # Shopping bag
├── collection/        # Soap collection
├── contact/           # Contact and newsletter form
├── footer/            # Website footer
├── header/            # Navigation
├── hero/              # Hero section
├── quiz/              # Personalized Soap Finder
├── ritual/            # Skincare ritual
├── shared/            # Shared branding and UI components
└── testimonial/       # Customer quote section

lib/
└── products.ts        # Soap information, pricing and ingredients
```

## Resend integration

The contact section supports two submission types:

- **Newsletter:** adds the visitor to Resend Contacts and sends an owner notification.
- **Query:** sends the visitor's message to the configured inbox.

The visitor's email is used as the Reply-To address, making it easy to respond directly.

## Deployment

The project is ready for deployment on Vercel:

1. Import the repository into Vercel.
2. Add the environment variables from `.env.local` in the Vercel project settings.
3. Deploy the project.
4. Test both contact-form options on the deployed website.

The sender address must use a domain verified through Resend.

## Security

- API keys are read only by the server-side contact endpoint.
- Local environment files are excluded from Git.
- Form submissions are validated before reaching Resend.
- User-provided content is escaped before being inserted into notification emails.
- A hidden spam-trap field blocks basic automated submissions.

For a larger public launch, consider adding rate limiting or Cloudflare Turnstile to the contact endpoint.

## Editing the collection

Soap names, descriptions, benefits, ingredients, prices, and display order are managed in:

```text
lib/products.ts
```

---

<div align="center">

Made thoughtfully for **Pure Petals** · Pune, India

</div>
