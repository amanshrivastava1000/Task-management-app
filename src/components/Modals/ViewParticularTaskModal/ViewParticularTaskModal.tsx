import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Badge, Box, Flex,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks";
import { setViewParticularTaskModal } from "../../../Features/TaskSlice/TaskSlice";
import { useEffect, useState } from "react";

const ViewParticularTaskModal = () => {
  const dispatch = useAppDispatch();

  const { viewParticularTaskModal } = useAppSelector(
    (state) => state.TaskSlice
  );
  const { taskList } = useAppSelector((state) => state.TaskSlice);
  const [viewTaskDetails, setViewTaskDetails] = useState<any>({});

  useEffect(() => {
    const editableTask = taskList?.find(
      (item: any) => item?.id === viewParticularTaskModal
    );
    setViewTaskDetails(editableTask);
  }, [viewParticularTaskModal, taskList]);

  return (
    <Modal
      isOpen={viewParticularTaskModal}
      onClose={() => dispatch(setViewParticularTaskModal(""))}
      isCentered
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4} bg="gray.50" rounded="md" boxShadow="sm">
            <Flex direction="column" gap={4}>
              <Box>
                <Text fontWeight="semibold" color="gray.600" fontSize="sm">
                  Title
                </Text>
                <Text fontSize="md" color="gray.800">
                  {viewTaskDetails?.title}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold" color="gray.600" fontSize="sm">
                  Description
                </Text>
                <Text fontSize="md" color="gray.800">
                  {viewTaskDetails?.description}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold" color="gray.600" fontSize="sm">
                  Due Date
                </Text>
                <Text fontSize="md" color="gray.800">
                  {new Date(viewTaskDetails?.dueDate).toLocaleDateString()}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold" color="gray.600" fontSize="sm">
                  Priority
                </Text>
                <Badge
                  colorScheme={
                    viewTaskDetails?.priority === "high"
                      ? "red"
                      : viewTaskDetails?.priority === "medium"
                      ? "yellow"
                      : "green"
                  }
                  px={2}
                  py={1}
                  rounded="md"
                  fontSize="0.8rem"
                  textTransform="capitalize"
                >
                  {viewTaskDetails?.priority}
                </Badge>
              </Box>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => dispatch(setViewParticularTaskModal(""))}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewParticularTaskModal;
