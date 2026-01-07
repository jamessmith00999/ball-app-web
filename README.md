# Ball App Web - Sports Betting & Trading Platform

Ball App Web is the web version of Ball App, a dual-mode application integrating sports betting and cryptocurrency trading features.

## Features

### Sports Betting Mode
- Real-time sports event betting
- Multiple sports support (Football, Basketball, Tennis, etc.)
- Live odds updates
- Betting history tracking

### Trading Mode
- Cryptocurrency trading
- K-line chart visualization
- Asset management
- Earnings statistics
- Community forum

## Tech Stack

- **Framework**: React 19 + Vite (Rolldown)
- **Styling**: TailwindCSS v4 + Sass
- **Data Fetching**: SWR + Axios
- **Authentication**: better-auth
- **Internationalization**: i18next (Multi-language support)
- **Language**: TypeScript
- **Build Optimization**: React Compiler, JavaScript Obfuscator

## Getting Started

### Prerequisites

- Node.js >= 18
- npm, yarn, or bun

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Code linting
npm run lint
```

## Project Structure

```
ball-app-web/
├── public/                 # Static public assets
├── src/
│   ├── api/               # API layer
│   │   ├── auth/          # Authentication API
│   │   ├── sports/        # Sports betting API
│   │   │   ├── config/    # Sports configuration
│   │   │   ├── early/     # Early betting
│   │   │   ├── favorites/ # User favorites
│   │   │   ├── inplay/    # Live betting
│   │   │   ├── leagues/   # League data
│   │   │   └── matches/   # Match data
│   │   └── futures/       # Trading API
│   │       ├── assets/    # User assets
│   │       ├── market/    # Market data
│   │       ├── orders/    # Trading orders
│   │       ├── positions/ # Trading positions
│   │       └── ...
│   ├── assets/            # Static assets
│   │   ├── fonts/         # Custom fonts
│   │   ├── images/        # Images and icons
│   │   ├── audio/         # Audio files
│   │   └── html/          # Chart HTML templates
│   ├── config/            # App configuration
│   ├── constants/         # Constants
│   │   ├── sports/        # Sports-related constants
│   │   └── trading/       # Trading-related constants
│   ├── lib/               # Utility libraries
│   ├── translations/      # i18n translations
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── scripts/               # Build scripts
├── .env.example           # Environment variables template
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## API Integration

- APIs use TypeScript type definitions
- Each API module has `index.ts` (functions) and `types.ts` (type definitions)
- SWR for data fetching with caching
- Axios for HTTP requests

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This is a private project. All rights reserved.

## Related Projects

- [Ball App](../ball-app) - React Native mobile application
