# Public Deployment

This app is a Next.js app with Postgres, Drizzle, email/password auth, and Stripe Checkout. Vercel is the shortest public deployment path because it supports Next.js API routes and server rendering without extra server setup.

## 1. Prepare production services

Create a production Postgres database. Good options are Neon, Supabase, or a Vercel Marketplace Postgres provider. Copy the pooled connection string as `POSTGRES_URL`.

Create or choose a Stripe account mode:

- Test mode for a public demo that should not charge real cards.
- Live mode for a real production launch.

Keep Stripe keys and webhook secrets from the same mode.

## 2. Set Vercel project settings

If you import the outer `SAAS` folder into Vercel, set the project Root Directory to:

```text
saas-starter
```

If you import the `saas-starter` repository directly, leave Root Directory as the default.

Use the default Vercel framework preset for Next.js.

## 3. Add environment variables

Add these in Vercel Project Settings > Environment Variables for Production:

```text
POSTGRES_URL=postgres://...
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
BASE_URL=https://your-public-domain.com
AUTH_SECRET=a-long-random-secret
```

Generate `AUTH_SECRET` locally with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Deploy

From GitHub:

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Set the Root Directory and environment variables above.
4. Deploy.

From the Vercel CLI:

```bash
vercel
vercel --prod
```

Run the commands from `saas-starter` unless your Vercel project is configured with `saas-starter` as the Root Directory.

## 5. Run production database migrations

After `POSTGRES_URL` points at the production database, run:

```bash
pnpm db:migrate
```

Optional demo seed:

```bash
pnpm db:seed
```

Do not seed production if you do not want the default `test@test.com` account.

## 6. Configure Stripe webhook

In Stripe Dashboard > Developers > Webhooks, add an endpoint:

```text
https://your-public-domain.com/api/stripe/webhook
```

Subscribe to these events:

```text
checkout.session.completed
customer.subscription.updated
customer.subscription.deleted
```

Copy the endpoint signing secret into Vercel as `STRIPE_WEBHOOK_SECRET`, then redeploy.

## 7. Smoke test

After deployment:

1. Visit the public `BASE_URL`.
2. Sign up or sign in.
3. Open `/pricing` and start checkout.
4. Confirm Stripe redirects back to the app.
5. Check Vercel Function Logs and Stripe webhook delivery logs if checkout or subscriptions do not update.
