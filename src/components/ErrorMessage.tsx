import React from 'react';
import {
  Box,
  Text
} from '@chakra-ui/react';

interface Props {
  errors: (Error | null)[];
}

const ErrorMessage: React.FC<Props> = ({ errors }) => (
  <Box>
    {errors.map((e, i) => (
      <Text key={i} color="tomato">
        {e && e.message}
      </Text>
    ))}
  </Box>
);

export default ErrorMessage;
