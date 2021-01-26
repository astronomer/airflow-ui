# Best Practices

## Typing and Linting
Make sure your code is properly typed and linted. They are useful tools to help us write better code and avoid lazy mistakes. Although at the same time, don't let perfect typing and linting get in the way of feature development. It can sometimes be ok to use `any` or `eslint-ignore-line` when using 3rd party libraries that may not be perfect themselves. 

## Components and Styling
Use existing shared components that pull from our existing theme as much as possible. This keeps the visual flow of the app more consistent and allows you to focus on feature/bug development instead of styling.

## Empty, loading, and error states
If your data has data from the server then it should be prepared to handle the times when the API doesn't give you exactly what you want immediately. Use the `ErrorMessage` component or `useToast` hook to display errors. Add some copy when there is no data. Include a loading indicator when the data is loading. Displaying an indicator when data is being refetched depends on the use-case.

## Testing
Whenever you build a new feature or fix a bug make sure to build corresponding tests with `react-testing-library`. Keep in mind empty, loading, and error states too.
