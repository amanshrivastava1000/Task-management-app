import { Box, Progress, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useAppSelector } from "../../../Store/Hooks";


const ProgressBarChart = () => {
  const { taskList } = useAppSelector((state) => state.TaskSlice);

  const { completedTasks, totalTasks, completionPercentage } = useMemo(() => {
    const total = taskList.length;
    const completed = taskList.filter((task: any) => task.completed).length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return {
      completedTasks: completed,
      totalTasks: total,
      completionPercentage: percentage,
    };
  }, [taskList]);

  return (
    <Box
      p={6}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      maxW="600px"
      mx="auto"
    >
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          Task Completion Progress
        </Text>
        <Progress
          value={completionPercentage}
          size="lg"
          colorScheme="green"
          width="100%"
          borderRadius="full"
          hasStripe
          isAnimated
        />
        <Text fontSize="md" color="gray.600">
          {completedTasks} out of {totalTasks} tasks completed (
          {completionPercentage.toFixed(1)}%)
        </Text>
      </VStack>
    </Box>
  );
};

export default ProgressBarChart;
