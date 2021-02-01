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

Modify local Airflow to allow API connections in `airflow/config_templates/default_airflow.cfg`:
```py
auth_backend = airflow.api.auth.backend.basic_auth
```

**NOTE:** For the time being, some additional hacking is required to add CORS headers
to the API responses. I've been cherry-picking **[this commit](https://github.com/apache/airflow/commit/5713291546c8c9da476f3073525468dd1bb73286)** as a short-term solution
until a permanent configuration is added.

Run application:
```bash
yarn start
```

Be sure to check out our [best practices](/docs/BEST_PRACTICES.md)

#### File Hierarchy

`src/views` - Page entry points, everything starts here
<br />`src/containers` - Reusable data containers
<br />`src/components` - Reusable components
<br />`src/utils` - Reusable helper functions
