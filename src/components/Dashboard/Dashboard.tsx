import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  Center,
} from "@chakra-ui/react";
import TaskShowOnPriority from "./TaskShowOnPriority/TaskShowOnPriority";
import ProgressBarChart from "./ProgressBarChart/ProgressBarChart";
import { useAppSelector } from "../../Store/Hooks";
import UpcomingTasksList from "./UpcomingTaskList/UpcomingTaskList";

const Dashboard = () => {
  const { taskList } = useAppSelector((state) => state.TaskSlice);

  return (
    <Box p={4}>
      <Heading mb={4} fontSize="lg" mt={4} textAlign="center">
        {taskList.length > 0
          ? "Dashboard"
          : "No Task is present in your dashboard"}
      </Heading>

      {taskList.length > 0 ? (
        <Center>
          <Tabs variant="soft-rounded" mt={2}>
            <TabList>
              <Tab>Task Distribution</Tab>
              <Tab>Task Completion</Tab>
              <Tab>Up Coming Task</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <TaskShowOnPriority />
              </TabPanel>
              <TabPanel>
                <ProgressBarChart />
              </TabPanel>
              <TabPanel>
                <UpcomingTasksList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Dashboard;
