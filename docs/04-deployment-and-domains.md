# Deployment and Domains

## Main Portfolio Domain

Production domain:

```txt
https://juantzun.dev
```

Repository:

```txt
https://github.com/Juanjho120/portfolio
```

Hosting provider:

```txt
Vercel
```

DNS provider:

```txt
Cloudflare
```

## Deployment Strategy

The portfolio is a Next.js application deployed from GitHub to Vercel.

```txt
GitHub main branch
        ↓
Vercel production deployment
        ↓
juantzun.dev
```

Production deployments should come from the `main` branch.

Preview deployments should be generated from branches or pull requests when future changes are reviewed before merging.

## Vercel Project Configuration

Recommended initial configuration:

```txt
Framework Preset: Next.js
Production Branch: main
Install Command: npm install
Build Command: npm run build
Output Directory: Vercel automatic detection
Environment Variables: none required for the current public portfolio
```

Useful local validation before pushing a deployment change:

```bash
npm run lint
npm run build
```

## Domain Configuration

Configure these domains in Vercel project settings:

```txt
juantzun.dev
www.juantzun.dev
```

Preferred canonical domain:

```txt
juantzun.dev
```

The `www` domain can be configured as an alias or redirected to the apex domain from Vercel.

DNS records should be copied from the Vercel dashboard after adding the custom domains. Do not hardcode provider targets without checking the current Vercel recommendation in the dashboard.

## Cloudflare DNS Notes

If the domain is purchased outside Cloudflare, update the registrar nameservers to the Cloudflare nameservers assigned to the zone.

After the zone is active in Cloudflare, add the DNS records requested by Vercel.

For the apex/root domain, Cloudflare supports CNAME flattening, so an apex CNAME can work when a provider asks for it. If Vercel recommends a specific A record instead, use the Vercel-provided record.

For `www`, use the CNAME target shown by Vercel.

During initial verification, keep DNS configuration simple and avoid adding unrelated records until the portfolio domain is verified.

## Future Project Subdomains

These subdomains are planned for individual project demos, but they should not block the main portfolio deployment:

```txt
tamias.juantzun.dev
knowledgehub.juantzun.dev
elections.juantzun.dev
devflow.juantzun.dev
mcp.juantzun.dev
performancelab.juantzun.dev
proteus.juantzun.dev
```

Each subdomain will be configured later based on where that project is hosted.

## Post-Deployment Validation

After deployment, validate:

```txt
/ redirects to /en
/en loads correctly
/es loads correctly
Language switcher works
CV opens from /cv/Juan_Tzun_CV.pdf
Project cards render images and tech badges
Project links open expected live demo URLs
Animated PCB background does not block clicks
Mobile layout works
Reduced motion preference disables decorative animation
```

## Rollback Strategy

Use Vercel deployment history to promote a previous successful deployment if a production issue appears.

The `main` branch should always represent the intended production state.

## Future CI/CD

Vercel already provides Git-based deployment from GitHub.

GitHub Actions can be added later for:

- lint validation
- build validation
- tests
- type checking
- deployment checks
