import { Button, Center, theme } from "@chakra-ui/react";
import { useAppDispatch } from "../../Store/Hooks";
import { setSwitchToDashBoard } from "../../Features/TaskSlice/TaskSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleOpenTaskCreationModal = () => {
    dispatch(setSwitchToDashBoard(false));
  };

  const handleDashborad = () => {
    dispatch(setSwitchToDashBoard(true));
  };

  return (
    <Center gap={4} w="90%" mx="auto">
      <Button
        mt={4}
        size="lg"
        bg="red.200"
        fontSize="14px"
        borderRadius="full"
        w="42vh"
        fontWeight={theme.fontWeights.bold}
        _hover={{ bgColor: "red.100" }}
        color="white"
        onClick={handleOpenTaskCreationModal}
      >
        Create Task
      </Button>
      <Button
        mt={4}
        size="lg"
        bg="green.100"
        fontSize="14px"
        borderRadius="full"
        w="42vh"
        fontWeight={theme.fontWeights.bold}
        _hover={{ bgColor: "green.500" }}
        color="white"
        onClick={handleDashborad}
      >
        Dashboard
      </Button>
    </Center>
  );
};

export default Header;
