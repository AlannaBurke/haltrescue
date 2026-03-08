# HaltRescue Platform

An open-source, all-in-one management and website platform for small animal rescues.

## Overview

HaltRescue Platform is a decoupled web application built on **Drupal 11** (backend) and **Next.js** (frontend). It provides a unified system for managing every aspect of a small rescue's operations — from animal records and foster placements to volunteer coordination, expense tracking, and a full public-facing website — all powered from a single content hub.

The platform is designed to be deployed and maintained by rescues without dedicated technical staff. The backend can be launched on any standard PHP host, and the frontend can be deployed to Vercel with a single click.

## Architecture

```
platform/
├── drupal-backend/     # Headless Drupal 11 backend (API + Admin)
├── nextjs-frontend/    # Next.js public website frontend
└── docs/               # Project documentation
```

The two applications communicate via a **GraphQL API**, generated automatically from the Drupal content model using the [GraphQL Compose](https://www.drupal.org/project/graphql_compose) module.

## Key Features

- **Animal Management:** Comprehensive profiles with medical records, photos, status tracking, and foster history.
- **People Management:** Unified profiles for fosters, volunteers, adopters, and donors.
- **Expense Tracking:** Log and categorize all rescue expenses, linked to individual animals.
- **Public Website:** A modern, fast, SEO-friendly website with animal listings, a blog, events, and an adoption application form.
- **Adoption Applications:** A customizable online application form with backend storage and review workflow.

## Getting Started

See the documentation in the [`docs/`](./docs/) directory for full setup and deployment instructions.

- [Architecture Overview](./docs/architecture.md)
- [Data Model](./docs/data-model.md)
- [Backend Setup Guide](./docs/backend-setup.md)
- [Frontend Setup Guide](./docs/frontend-setup.md)
- [Development Roadmap](./docs/roadmap.md)

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend CMS** | Drupal 11 (PHP 8.3+) |
| **Database** | MySQL 8.0+ / MariaDB 10.6+ |
| **API** | GraphQL (via `graphql_compose` module) |
| **Authentication** | OAuth2 (via `simple_oauth` module) |
| **Frontend Framework** | Next.js 15 (React) |
| **Frontend Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Drupal-Next Bridge** | `next-drupal` library |

## Contributing

This project is open source and welcomes contributions from the community. Please read the [Contributing Guide](./docs/contributing.md) before submitting a pull request.

## License

This project is licensed under the [GNU General Public License v2.0](../LICENSE).
