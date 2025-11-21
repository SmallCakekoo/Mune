# 🎵 Mune - Collaborative Workspace with Integrated Music Player

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

**Mune** is a highly interactive React web application that combines the collaborative features of Figma and Notion with an integrated music streaming experience. It's designed as a comprehensive solution for creative teams who want to brainstorm, organize tasks, and enjoy music together in real-time.

## ✨ Features

- 🎨 **Visual Canvas** - Interactive whiteboard with zoom, pan, and collaboration
- 📝 **Smart Notes** - Rich text notes and to-do lists for project organization
- 🎵 **Synchronized Music** - Deezer-powered music playback across all room participants
- 👥 **Real-time Collaboration** - Live presence indicators
- 🎨 **Customizable Themes** - Multiple themes with dark/light mode
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

# 📁 Project Structure -- Mune

``` plaintext
mune/
├── .github/                 # GitHub Actions workflows and templates.
├── node_modules/            # Installed project dependencies.
├── public/                  # Static assets (icons, images, root index.html).
└── src/                     # Application source code
    ├── assets/              # Multimedia files (images, fonts, etc.).
    ├── components/          # Reusable UI components.
    ├── context/             # Global state management using the Context API.
    ├── hooks/               # Custom React hooks for reusable logic.
    ├── pages/               # Components representing complete routes or views.
    ├── routes/              # Application route configuration.
    ├── services/            # Modules to interact with external APIs.
    ├── styles/              # Global or modular style files.
    ├── types/               # TypeScript type definition files.
    ├── utils/               # Auxiliary utility functions.
    ├── App.css
    ├── App.tsx              # Main application component.
    ├── index.css
    └── main.tsx             # Application entry point.
├── .env                     # Environment variables (You won't see this on GitHub.)
├── .gitignore               # Files and directories to be ignored by Git.
├── .prettierrc              # Prettier formatter configuration.
├── CODE_OF_CONDUCT.md       # Code of Conduct.
├── commitlint.config.js     # Configuration for commit message linting.
├── CONTRIBUTING.md          # Guide for contributing to the project.
├── eslint.config.js         # ESLint linter configuration.
├── index.html               # Main HTML file.
├── LICENSE                  # Project license.
├── package-lock.json        # Dependency lock file.
├── package.json             # Project metadata and command scripts.
├── postcss.config.js        # PostCSS configuration (typically for Tailwind).
├── README.md                # Project documentation.
├── SECURITY.md              # Security disclosure policy.
├── tailwind.config.js       # Tailwind CSS configuration.
├── tsconfig.app.json        # TypeScript configuration for the application.
├── tsconfig.json            # Base TypeScript configuration.
├── tsconfig.node.json       # TypeScript configuration for Node/build environments.
└── vite.config.ts           # Vite bundler configuration.
```

------------------------------------------------------------------------

## 🧩 Backend & Core Services

### 🔥 Firebase

-   **Firebase Authentication**\
    User login, signup, and session management.

-   **Firestore Database**\
    Stores Rooms, notes, playlists, user data, real-time states.

-   **Firebase Storage**\
    Uploads for profile images, Room assets, etc.

------------------------------------------------------------------------

## 🛠 Development Stack

### ⚡ Build & Tooling

| Dependency | Description                                  |
| ---------- | -------------------------------------------- |
| Vite     | Dev server & bundler                           |
| TypeScript   | Static typing                              |
| PostCss       | CSS processing                            |
| Autoprefixer      | CSS processing                        |
| TailwindCSS 4       | Utility-first styling               |
| @vitejs/plugin-react      | React integration             |

### 🧹 Quality & Automation

| Dependency | Description                                  |
| ---------- | -------------------------------------------- |
| ESLint     | Code linting                                 |
| TypeScript ESLint   | TS-aware lint rules                 |
| Prettier       | Code formatting                          |
| Commitlint      | Validates commit messages               |
| Lint-Staged        | Runs tools on staged files           |
| Husky      | Pre-commit & pre-push hooks                  |

### 🚀 Git Workflow

-   Conventional commits\
-   Branch workflow (feature/, fix/, hotfix/, experiment/)\
-   Pre-commit hooks for lint, type-check, and formatting

------------------------------------------------------------------------

## 📦 Key Dependencies

### Essential Dependencies

| Dependency | Description                     |
| ---------- | ------------------------------- |
| **React 19** | UI library                    |
| **React Router v7** | Routing system         |
| **Redux Toolkit** | Global state management  |
| **Firebase** | Auth, DB, storage             |
| **Framer Motion** | Animations               |
| **@dnd-kit** | Drag & drop interactions      |
| **Zod** | Schema validation                  |
| **Axios** | HTTP requests                    |
| **UUID** | Unique IDs                        |
| **React Hook Form** | Form handling          |
| **react-zoom-pan-pinch** | Canvas zoom       |

------------------------------------------------------------------------

## 🎨 Styling & UI Utilities

| Dependency | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| **TailwindCSS 4** | Utility-first styles                                         |
| **clsx** | Conditional class names utility                                       |
| **tailwind-merge** | Utility to merge Tailwind CSS classes without conflict      |
| **@tabler/icons-react** | Extensive and customizable icon set                    |

------------------------------------------------------------------------

## 🧪 Dev Dependencies

 | Dependency | Description                                   |
| ---------- | ---------------------------------------------- |
| **ESLint** | Code linting                                   |
| **eslint-plugin-react-hooks** | Hooks specific rules        |
| **eslint-plugin-react-refresh** | Fast refresh support      |
| **Husky** | Git hooks management                            |
| **Lint-Staged** | Runs scripts on staged files              |
| **Commitlint** | Commit message validation                  |
| **TypeScript** | Static type system                         |
| **Vite** | Application bundler                              |

------------------------------------------------------------------------

## ⚙️ Useful Scripts

``` bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run lint:fix     # Fix lint issues
npm run type-check   # Validate TypeScript
npm run preview      # Preview production build
```

------------------------------------------------------------------------

## 🚀 Quick Start

### Prerequisites

- Node.js 23 or 18+
- npm or yarn
- Firebase account
- Deezer API credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mune.git

# Navigate to project directory
cd mune

# Install dependencies
npm install

# Set up environment variables
touch .env

# Start development server
npm run dev
```

### Environment Variables

Create a .env file with:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_DEEZER_APP_ID=your_deezer_app_id
```

## 🛠️ Tech Stack

- Frontend: React 19, TypeScript, Vite
- Styling: Tailwind CSS v4, Framer Motion
- Backend: Firebase (Auth, Firestore, Storage)
- Real-time: WebSockets, Firebase Realtime Updates
- Music: Deezer API

## 🤝 Contributing

Once this project is finished, you can contribute afterwards. So we welcome contributions! Please read our ¨[Contributing Guidelines](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) first.

And this one here is the **Developer Conduct Guidelines:** [DEVELOPER_CODEOFCONDUCT.md](./DEVELOPER_CODEOFCONDUCT.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🛡️ Security

Please report any security issues by following our [Security Policy](./SECURITY.md).

## 📞 Support

Create an [issue](https://github.com/SmallCakekoo/Mune/issues)
<br>
Message me on Discord (smallcakeko)
