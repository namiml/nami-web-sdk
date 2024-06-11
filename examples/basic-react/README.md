# Basic React Example

This directory contains a simple example of how to use the Nami Web SDK with a vanilla JavaScript application.

## Project Structure

- `index.html`: The main HTML file that serves as the entry point of your application. It includes a `div` with the id `root` where your React application is mounted.
- `src/`: This directory contains the TypeScript source code.
  - `index.tsx`: The main TypeScript file. It imports the `Paywall` component and renders it into the `root` div in `index.html`.
  - `Paywall.tsx`: This is a React component that initializes the Nami SDK and launches a paywall. It uses the `useEffect` hook to run the initialization code when the component is first rendered, and the `useRef` hook to get a reference to a `div` where the paywall is inserted.

## Getting Started

## Usage

This example demonstrates how to initialize the Nami SDK and launch a paywall. 

You will need to replace `APP_PLATFORM_ID` and `'YOUR_PLACEMENT_LABEL'` in src/Paywall.tsx with your actual App Platform ID and placement label.

1. Install the dependencies via NPM or Yarn:

```
npm install
```

```
yarn install
```

2. Start the application via NPM or Yarn:

```
npm start
```

```
yarn start
```

This will start a local server and you can view the application in your web browser.

## License

Your use is subject to the terms of the agreement at: https://www.nami.ml/legal/tos
