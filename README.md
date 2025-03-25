# 3D Interactive Portfolio

An immersive 3D portfolio website built with React and Three.js, featuring interactive objects and smooth camera animations.

## Features

- Interactive 3D workspace environment
- Object-based navigation and interaction
- Project showcase with tabs and cards
- About me section with skills and timeline
- Contact form with social links
- Theme toggling (light/dark mode)
- Sound effects and background music options
- Responsive design with mobile fallbacks

## Tech Stack

- React with TypeScript
- Three.js via React Three Fiber
- @react-three/drei for Three.js helpers
- React Spring for animations
- Styled Components for styling
- React Router for navigation
- use-sound for audio handling

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/3d-portfolio.git
cd 3d-portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## Customization

- Replace placeholder 3D objects with your own models
- Update project information in `ProjectDisplay.tsx`
- Modify personal information in `AboutMe.tsx`
- Update contact details in `Contact.tsx`
- Add your own sound effects in the `assets/sounds` directory
- Customize the theme colors in `ThemeContext.tsx`

## Deployment

This project can be built and deployed to any static hosting service:

```bash
npm run build
# or
yarn build
```

## License

MIT

## Acknowledgments

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Drei](https://github.com/pmndrs/drei)
- [Styled Components](https://styled-components.com/)
