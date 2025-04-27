import { Box, Badge, Text, VStack, HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "../../../Store/Hooks";

const UpcomingTasksList = () => {
  const { taskList } = useAppSelector((state) => state.TaskSlice);

  
  const upcomingTasks = useMemo(() => {
    const today = dayjs();
    return taskList
      .filter(
        (task: any) =>
          !task.completed && // Only incomplete tasks
          (dayjs(task.dueDate).isAfter(today) ||
           dayjs(task.dueDate).isSame(today, "day"))
      )
      .sort(
        (a: any, b: any) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix()
      );
  }, [taskList]);
  

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Box
      p={6}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      w="95%"
      mx="auto"
      mt={8}
   
    >
      <VStack spacing={4} align="stretch">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="gray.700"
          textAlign="center"
        >
          Upcoming Tasks
        </Text>

        <Box overflowY="auto" height="60vh" overflowX="hidden">
          {upcomingTasks.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              No upcoming tasks!
            </Text>
          ) : (
            upcomingTasks.map((task: any) => (
              <Box
                key={task.id}
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                boxShadow="sm"
                _hover={{
                  boxShadow: "md",
                  transform: "scale(1.02)",
                  transition: "0.3s",
                }}
                bg="gray.50"
                mt={2}
              >
                <HStack justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="semibold">
                    {task.title}
                  </Text>
                  <Badge
                    colorScheme={getPriorityColor(task.priority)}
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {task.priority.toUpperCase()}
                  </Badge>
                </HStack>

                <Text fontSize="sm" color="gray.600" mt={2}>
                  Due: {dayjs(task.dueDate).format("DD MMM YYYY")}
                </Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default UpcomingTasksList;
