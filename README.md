# Airflow UI POC

### Built with
- React
- TypeScript
- Neutrino
- Chakra UI

## Installation

Clone the repository and use the package manager [yarn](https://yarnpkg.com) to install the project's dependancies.

```bash
yarn install
```

## Development

Modify local Airflow to allow API connections in `airflow/config_templates/default_airflow.cfg`:
```py
auth_backend = airflow.api.auth.backend.basic_auth
```

Run application:
```bash
yarn start
```

#### File Hierarchy

`src/views` - Page entry points, everything starts here
<br />`src/containers` - Reusable data containers
<br />`src/components` - Reusable components
<br />`src/utils` - Reusable helper functions
