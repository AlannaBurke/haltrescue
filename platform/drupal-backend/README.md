# HaltRescue Platform: Drupal Backend

This directory will contain the Drupal 11 backend for the HaltRescue Platform.

## Status

**Phase 1 development has not yet started.** This directory is a placeholder.

## Overview

The Drupal backend serves as the headless CMS and data management hub for the entire platform. It provides:

- A rich administrative interface for rescue staff to manage animals, people, expenses, and website content.
- A GraphQL API (powered by the `graphql_compose` module) that the Next.js frontend consumes.
- Secure OAuth2 authentication for frontend interactions.

## Setup

See the [Backend Setup Guide](../docs/backend-setup.md) for installation and configuration instructions.

## Key Modules

| Module | Purpose |
| :--- | :--- |
| `graphql` | Core GraphQL engine |
| `graphql_compose` | Auto-generates GraphQL schema from content types |
| `simple_oauth` | OAuth2 authentication for the frontend |
| `webform` | Adoption application form |
| `paragraphs` | Flexible page content components |
| `address` | Standardized address field |
| `admin_toolbar` | Improved admin navigation |
