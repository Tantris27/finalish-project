import { Box } from '@chakra-ui/core';

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Box>{children}</Box>;
};
