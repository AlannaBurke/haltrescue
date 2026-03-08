# HaltRescue Platform: Next.js Frontend

This directory will contain the Next.js 15 public-facing website for the HaltRescue Platform.

## Status

**Phase 3 development has not yet started.** This directory is a placeholder.

## Overview

The Next.js frontend is the public-facing website for the rescue. It consumes data from the Drupal backend via GraphQL and renders a fast, modern, and accessible website for potential adopters and supporters.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Drupal Integration:** `next-drupal` library
- **API:** GraphQL

## Setup

See the [Frontend Setup Guide](../docs/frontend-setup.md) for installation and configuration instructions.

## Key Pages

| Route | Description |
| :--- | :--- |
| `/` | Homepage |
| `/animals` | Animal listings with search and filters |
| `/animals/[slug]` | Individual animal profile |
| `/adopt` | Adoption information and application form |
| `/blog` | Blog post listing |
| `/blog/[slug]` | Individual blog post |
| `/events` | Events listing |
| `/about` | About the rescue |
| `/contact` | Contact page |

## Deployment

This application is designed to be deployed on [Vercel](https://vercel.com). See the [Deployment Guide](../docs/frontend-setup.md#deployment) for instructions.
