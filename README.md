# Airflow UI POC

#### Built with:
- [React](https://reactjs.org/) - a JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - extends JavaScript by adding types.
- [Neutrino](https://neutrinojs.org/) - lets you build web and Node.js applications with shared presets or configurations.
- [Chakra UI](https://chakra-ui.com/) - a simple, modular and accessible component library that gives you all the building blocks you need to build your React applications.
- [React Query](https://react-query.tanstack.com/) - powerful async data handler. all API calls go through this
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - write tests that focus on functionality instead of implementation

## Installation

Clone the repository and use the package manager [yarn](https://yarnpkg.com) to install the project's dependancies.

```bash
yarn install
```

Create your local environment
```bash
cp .env.example .env
```

## Development

Modify local Airflow to allow API connections. For Breeze development, add the following to `files/airflow-breeze-config/variables.env`:
```env
export AIRFLOW__API__AUTH_BACKEND=airflow.api.auth.backend.basic_auth
export AIRFLOW__API__ACCESS_CONTROL_ALLOW_HEADERS=*
export AIRFLOW__API__ACCESS_CONTROL_ALLOW_METHODS=*
export AIRFLOW__API__ACCESS_CONTROL_ALLOW_ORIGIN=http://127.0.0.1:28080
```

Start local Webserver:
```bash
airflow webserver
```

Start the UI application:
```bash
yarn start
```

Be sure to check out our [best practices](/docs/BEST_PRACTICES.md)

#### File Hierarchy

`src/views` - Page entry points, everything starts here
<br />`src/containers` - Reusable data containers
<br />`src/components` - Reusable components
<br />`src/utils` - Reusable helper functions
