# Consent Management App - Development Environment Setup

This guide will walk you through the process of setting up the development environment and running the Consent Management application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git

## Clone the Repository

1. Open your terminal or command prompt.
2. Clone the repository using Git:
   ```
   git clone https://github.com/hkchakravarty/consent-management-app.git
   cd consent-management-app
   ```

## Install Dependencies

1. Install the project dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_ITEMS_PER_PAGE=2
   ```

## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173` (or the port specified in the console output).

## Building for Production

1. To create a production build:
   ```
   npm run build
   ```
2. The built files will be in the `dist` directory.

## Running Tests

1. To run the unit tests:
   ```
   npm test
   ```

## Linting

1. To run the linter:
   ```
   npm run lint
   ```

## Additional Commands

- `npm run preview`: Preview the production build locally.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly.
2. Check that you're using the correct versions of Node.js and npm.
3. Verify that the `.env` file is set up correctly.
4. Clear the npm cache: `npm cache clean --force`

If problems persist, please open an issue on the GitHub repository.

## Contributing

Please read the CONTRIBUTING.md file for details on our code of conduct and the process for submitting pull requests.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

---

# Front-end engineering challenge

This challenge is used by Didomi for evaluating candidates for front-end development positions.

This challenge is a chance for engineers at Didomi to see how you code and organize a project to implement a specification.

## Deliverables

The expected deliverable is a fully functional project that includes the following:

- Code of the application
- Tests of the application
- Documentation for launching a development environment and running the application

You are expected to match the mockups and use the right components as needed.

## Technical stack

The application should use one of the following stacks:

- [React](https://reactjs.org/) with a Material library

Except for these requirements, feel free to use whichever libraries, frameworks or tools you deem necessary.

## HTTP API calls

This challenge requires HTTP API calls when a user adds a consent or to populate the list of consents.

What we recommend is to implement the calls as standard HTTP requests to a REST API with the following specification:

- `GET /consents`: Returns a list of consents along with pagination data.
- `POST /consents`: Add a new consent.

You can then mock the HTTP calls by mocking the `XMLHttpRequest` object or the `fetch` method in the browser. The mock should have a pre-populated list of objects and add a new object to the list when a `POST` request is sent.

Other methods of mocking are also acceptable as long as there is no actual HTTP calls sent out.

## Expectations

Your code will be reviewed by multiple engineers at Didomi and will serve as the base for a discussion in interviews.  
We want to see how you approach working on a complete project and strongly recommend that you work on this challenge alone. We will particularly focus on your attention to details and expect the code to be professionally structured, commented, documented, and tested.

If anything is unclear, feel free to ask any question that might help you understand the specifications or requirements better.

## Delivery

Your application can be sent to us as a GitHub repository (in which case you are welcome to fork this repository) or as a compressed archive containing all the deliverables.

# The challenge

In some specific cases, companies need to collect consent from consumers before using their data. For instance, website visitors might need to explicitly consent to receive email newsletters through a form before a company can send emails to those visitors.

The goal of this challenge is to build the simplest possible consent collection and management application where a user can enter its information and agree to a list of data processing. It's not very user-friendly but that'll do the trick for this time.

## Product specification

The application is composed of two views.

### 1. Consent collection form

A form that allows a user to enter her name, email address and to select data processes that she agrees to.

When the user fills out the form and clicks on the "Give consent" button, the consent gets added to the list of consents that appears on the second view.

![Mockup](https://github.com/didomi/challenges/raw/master/frontend/wireframes/1%20-%20Give%20consent.png)

### 2. Consent management

A list of consents that were given by users. This view simply displays items from a list with client-side pagination.

![Mockup](https://github.com/didomi/challenges/raw/master/frontend/wireframes/2%20-%20Collected%20consents.png)

## Review session

After receiving your code challenge, we organize a review session with you and a few engineers from Didomi. During the review session, we will:

- Ask you to share you screen and do a quick demo of the app you built
- Ask you to present your project structure and walk us through the code (the different components, the state management, etc.)
- Ask you general technical questions related to your project and frontend architecture

A few examples of the topic that we like to discuss in more details:

- Scaling of an SPA
- Smart/dumb components
- UI libraries
- State management
- Styling
- Testing
