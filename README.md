# Gatsby Starter Vendure
Gatsby starter for creating an eCommerce site using [Vendure eCommerce api](https://www.vendure.io). Currently work in progress.

This starter adapts an [existing](https://github.com/parmsang/gatsby-starter-ecommerce) Gatsby eCommerce starter which adapts an [existing](https://github.com/moltin-examples/nextjs-demo-store) NextJS eCommerce starter for [GatsbyJS](https://www.gatsbyjs.org/).

Demo: WIP

## Getting started

Install this starter (assuming Gatsby is installed) by running from your CLI:

`gatsby new gatsby-store https://github.com/kencruz/gatsby-starter-vendure`

### Running in development

`npm run develop`

### Additional Setup

Both a vendure server and Stripe account are needed for this store to run successfully.

Create a `.env.development` and `.env.production` file at the project root with your Stripe test `publishable key`.

```dosini
STRIPE_PUBLISHABLE_KEY=
```

## Features

- Vendure eCommerce API
- React 16
- PWA (includes manifest.webmanifest & offline support)
- Eslint & Prettier
- Styled Components
- Google Analytics - (you enter the tracking-id)
- Semantic-UI
- Authentication via Vendure (Login and Register)
- Stripe checkout
