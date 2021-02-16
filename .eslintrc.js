module.exports = {
  "env":{
    "jest": true,
  },
  extends: ['airbnb-typescript'],
    parserOptions: {
      project: './tsconfig.json',
  },
  "rules": {
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "arrow-body-style": 1,
    "react/jsx-one-expression-per-line": 1,
  }
};
