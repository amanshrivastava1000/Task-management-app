import { Flex, Text, Box } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box as="header" w="100%" bg="gray.800" color="white" shadow="md">
      <Flex maxW="100vw" mx="auto" px={4} h="60px" align="center" gap={4}
      >
        <Text fontSize="lg" fontWeight="bold">
          Create Task
        </Text>
      </Flex>
    </Box>
  );
};

export default NavBar;
