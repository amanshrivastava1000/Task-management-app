import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, RadioGroup, Stack, Radio, useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks";
import { setOpenTaskCreationModal, setTaskList,
} from "../../../Features/TaskSlice/TaskSlice";
import { nanoid } from "nanoid"; // use for creating uique id for every task
import dayjs from "dayjs";

const TaskCreationModal = () => {
  const dispatch = useAppDispatch();

  const toast = useToast();

  const { openTaskCreationModal } = useAppSelector((state) => state.TaskSlice);

  const [taskData, setTaskData] = useState<any>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    setTaskData({});
  }, [openTaskCreationModal]);

  const handleSaveTask = () => {

    const { title, description, priority, dueDate } = taskData;
    if (![title, description, priority, dueDate].every(Boolean)) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields before saving.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    const newTask = { ...taskData, id: nanoid(),completed: false, };
    dispatch(setTaskList(newTask));
    dispatch(setOpenTaskCreationModal(false));
  };

  return (
    <Modal
      isOpen={openTaskCreationModal}
      onClose={() => dispatch(setOpenTaskCreationModal(false))}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form">
          <FormControl mb={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Task title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Task description"
              resize="vertical"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              value={taskData.dueDate}
              min={dayjs().format("YYYY-MM-DD")}
              max={dayjs().add(2, "month").format("YYYY-MM-DD")}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Priority</FormLabel>
            <RadioGroup
              value={taskData.priority}
              onChange={(value) =>
                setTaskData((prev: any) => ({ ...prev, priority: value }))
              }
            >
              <Stack direction="row" spacing={6}>
                <Radio value="high">High</Radio>
                <Radio value="medium">Medium</Radio>
                <Radio value="low">Low</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={() => dispatch(setOpenTaskCreationModal(false))}
          >
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSaveTask}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskCreationModal;
