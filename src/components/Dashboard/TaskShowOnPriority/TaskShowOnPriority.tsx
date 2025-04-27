import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import { useAppSelector } from "../../../Store/Hooks";

// Register Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskShowOnPriority = () => {
  const { taskList } = useAppSelector((state) => state.TaskSlice);

  // Count tasks by priority
  const priorityCounts = useMemo(() => {
    const counts: any = { high: 0, medium: 0, low: 0 };
    taskList.forEach((task: any) => {
      if (task.priority in counts) {
        counts[task.priority]++;
      }
    });
    return counts;
  }, [taskList]);

  const totalTasks =
    priorityCounts.high + priorityCounts.medium + priorityCounts.low;

  const data = {
    labels: ["High Priority", "Medium Priority", "Low Priority"],
    datasets: [
      {
        label: "Task Distribution",
        data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
        backgroundColor: ["#E53E3E", "#ED8936", "#38A169"], // Red, Orange, Green
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#2D3748", // gray.800
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = ((value / totalTasks) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={4}
      p={6}
      h="78vh"
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Task Priority Distribution
      </Heading>
      <Center>
        <Pie data={data} options={options} />
      </Center>
    </Box>
  );
};

export default TaskShowOnPriority;