# Social Media Application

This is a simple social media application built with React, Redux, and Tailwind CSS. The application allows users to log in, create posts with text and images, and view a feed of posts.

## Features

- User authentication (mock login system)
- Create posts with text and images
- View a feed of posts
- Responsive design
- Dark/light mode toggle

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

This will start the development server at http://localhost:5173.

## Project Structure

- `src/` - Source code
  - `components/` - React components
    - `auth/` - Authentication related components
    - `layout/` - Layout components
    - `posts/` - Post related components
    - `providers/` - Context providers
    - `ui/` - UI components (buttons, cards, etc.)
  - `hooks/` - Custom React hooks
  - `pages/` - Page components
  - `store/` - Redux store configuration
    - `slices/` - Redux slices for state management
  - `utils/` - Utility functions

## Technologies Used

- React - Frontend library
- Redux Toolkit - State management
- React Router - Routing
- Tailwind CSS - Styling
- Vite - Build tool
- TypeScript - Type checking

## Login Credentials

For testing purposes, you can log in using the following credentials:

- Username: user
- Password: password

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
