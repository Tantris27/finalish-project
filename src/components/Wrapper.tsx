import { Box } from '@chakra-ui/core';

interface WrapperProps {}
// Comment for branchCreation
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Box>{children}</Box>;
};
