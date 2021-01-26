import React from 'react';
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

interface Props {
  errors: (Error | null)[];
}

const ErrorMessage: React.FC<Props> = ({ errors }) => (
  <>
    {errors.map((e) => {
      if (e && e.message) {
        return (
          <Alert status="error" my="4" key={e.message}>
            <AlertIcon />
            {e.message}
          </Alert>
        );
      }
      return null;
    })}
  </>
);

export default ErrorMessage;
