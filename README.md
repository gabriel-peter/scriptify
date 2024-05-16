This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Supabase

Closing this issue as we're not going to be exposing auth.users to the public at all -- there's some very sensitive data there like the password hash and other things.
https://github.com/supabase/auth-js/issues/359#issuecomment-1368012693


### [Local Development](https://supabase.com/docs/guides/cli/local-development)

Magic Links do not work for the custom purpose of sending to a third-party, they automatically log out the current user. TODO make custom solution with SES.
 
```
yarn supabase:start
```

- [Dumping local database into seed.sql](https://supabase.com/blog/partial-postgresql-data-dumps-with-rls)
```shell
pg_dump \ 
-h localhost \
-U postgres \
-d postgres \
-n 'public|auth' \  
--data-only \
--enable-row-security \
--port=54322 > supabase/seed.sql
```

#### Troubleshooting
[AuthApiError: Database error saving new user from db trigger](https://github.com/orgs/supabase/discussions/13043)

## HealthHaven Rx
- [API Documentation](https://documenter.getpostman.com/view/26207264/2s9YeG7Xho#intro)


AWS SES SMTP Creds

AKIAQQ2Q76JP5HZCNDVD
BIdamI2O+nl6k4tUEDZIskCltnP0Fruu3Yc176mTuPuC