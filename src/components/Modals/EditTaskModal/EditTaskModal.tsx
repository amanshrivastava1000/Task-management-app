import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, RadioGroup, Stack, Radio, useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks";
import {
  setEditTaskModal,
  setUpdateTask,
} from "../../../Features/TaskSlice/TaskSlice";
import dayjs from "dayjs"

const EditTaskModal = () => {
  const dispatch = useAppDispatch();

  const { editTaskModal } = useAppSelector((state) => state.TaskSlice);
  const { taskList } = useAppSelector((state) => state.TaskSlice);
  const { editSeletedTask } = useAppSelector((state) => state.TaskSlice);
  const [editableTask, setEditableTask] = useState<any>({});
  const toast = useToast();

  const handleEditTask = () => {
    const { title, description, priority, dueDate } = editableTask;

    if (![title, description, priority, dueDate].every(Boolean)) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields before Edit.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    dispatch(setUpdateTask(editableTask));
    dispatch(setEditTaskModal(false));
  };

  useEffect(() => {
    const editableTask = taskList?.find(
      (item: any) => item?.id === editSeletedTask
    );
    setEditableTask(editableTask);
  }, [editSeletedTask, taskList]);

  return (
    <Modal
      isOpen={editTaskModal}
      onClose={() => dispatch(setEditTaskModal(false))}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Task </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form">
          <FormControl mb={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Task title"
              value={editableTask?.title}
              onChange={(e) =>
                setEditableTask((prev: any) => ({
                  ...prev,
                  title: e?.target?.value,
                }))
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Task description"
              resize="vertical"
              value={editableTask?.description}
              onChange={(e) =>
                setEditableTask((prev: any) => ({
                  ...prev,
                  description: e?.target?.value,
                }))
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              value={editableTask?.dueDate}
              min={dayjs().format("YYYY-MM-DD")}
              max={dayjs().add(2, "month").format("YYYY-MM-DD")}
              onChange={(e) =>
                setEditableTask((prev: any) => ({
                  ...prev,
                  dueDate: e?.target?.value,
                }))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Priority</FormLabel>
            <RadioGroup
              value={editableTask?.priority}
              onChange={(value) =>
                setEditableTask((prev: any) => ({ ...prev, priority: value }))
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
          <Button mr={3} onClick={() => dispatch(setEditTaskModal(false))}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleEditTask}>
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
