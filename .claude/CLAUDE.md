# Project Overview

This is a monorepo containing both frontend and backend applications.

## Repository Structure

```
fastreact/
├── frontend/          # React frontend application
├── backend/           # Backend API (coming soon)
└── CLAUDE.md          # This file
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
- Run `npm run check` before committing to format and lint

## Backend

Backend documentation will be added when the backend is implemented.
