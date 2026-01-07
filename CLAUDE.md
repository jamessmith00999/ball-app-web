# Ball App Web - Project Documentation

## Project Overview

This project is a **web version rewrite** of the React Native Expo app located at `~/BallProjects/ball-app`.

The goal is to migrate the mobile app to a web application while maintaining consistent styling, structure, and business logic.

## Source App Reference

- **Source Path**: `~/BallProjects/ball-app`
- **Source Tech Stack**: React Native + Expo
- **Target Tech Stack**: React + Vite + TypeScript (Web)

## Migration Guidelines

### Animation Migration

When migrating animations from React Native to web:

1. **First choice**: CSS `transition` properties
2. **Second choice**: CSS `animation` / `@keyframes`
3. **Last resort**: JavaScript-based animations (only if CSS cannot achieve the effect)

### Component Migration

| React Native        | Web Equivalent                            |
| ------------------- | ----------------------------------------- |
| `LinearGradient`    | CSS `linear-gradient()`                   |
| `Animated.View`     | CSS transitions/animations or JS          |
| `StyleSheet.create` | CSS modules / inline styles / CSS-in-JS   |
| `TouchableOpacity`  | `<button>` with CSS hover/active states   |
| `ScrollView`        | `<div>` with `overflow: auto`             |
| `FlatList`          | Native list with virtualization if needed |
| `Image`             | `<img>` tag                               |
| `Text`              | `<span>` or `<p>`                         |
| `View`              | `<div>`                                   |

### Core Principles

1. **Style structure consistency**: Keep the same visual hierarchy and styling structure as the source app
2. **Logic consistency**: Business logic and API calls should remain the same
3. **Progressive migration**: Pages will be migrated one by one
4. **Web-first approach**: Use native web capabilities instead of heavy JS libraries when possible

## Workflow

The migration process follows this pattern:

1. User specifies which page/component to migrate
2. Read the corresponding source code from `~/BallProjects/ball-app`
3. Create the web equivalent in this project
4. Repeat until all pages are completed

## Project Structure

```
ball-app-web/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── contexts/      # React contexts
│   ├── constants/     # Constants and configurations
│   └── styles/        # Global styles
├── public/            # Static assets
└── index.html         # Entry HTML file
```

## Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview
```
