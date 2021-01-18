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
    {errors.map((e, i) => {
      if (e && e.message)
        return (
          <Alert status="error" my="4" key={i}>
            <AlertIcon />
            {e.message}
          </Alert>
        )
      else return null;
    })}
  </>
);

export default ErrorMessage;
