# Project Overview

This is a monorepo containing both frontend and backend applications.

## Repository Structure

```
fastreact/
├── frontend/          # React frontend application
└── backend/           # Backend API (coming soon)
```

## Frontend

The frontend is a React application built with the TanStack ecosystem.

**For detailed frontend architecture, see:** [frontend/docs/ARCHITECTURE.md](frontend/docs/ARCHITECTURE.md)

### Quick Start

```bash
cd frontend
npm install
npm run dev
```

### Key Technologies

- React 19 with TypeScript
- TanStack Router (file-based routing)
- TanStack Query (data fetching)
- TanStack Form (form handling)
- Vite (build tool)

## Development Guidelines

- Use TypeScript for all new code
- Follow the existing file structure patterns
- Use TanStack Router for new routes (file-based in `src/routes/`)
- Use TanStack Query for API calls and server state
- Run `npm run lint` before committing to lint code

## CSS & Styling

**IMPORTANT**: When working with CSS or styling, always use the `css-generator` skill.

This includes:
- Creating new component styles
- Modifying existing CSS
- Adding responsive styles
- Working with design tokens
- Fixing layout issues

The skill ensures consistency with the project's:
- BEM naming convention
- Design token system
- Data-attribute variants pattern
- Theme support (light/dark, color variants)

**Reference**: See `frontend/docs/CSS_PATTERNS.md` for the complete token reference and patterns.

## Backend

Backend documentation will be added when the backend is implemented.
