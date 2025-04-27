import { Box, Center, List, ListItem, Flex, Text, Badge, IconButton, HStack, Menu, MenuButton, MenuList, MenuItem, Button, Input, FormControl, FormLabel, Switch, Tooltip, useBreakpointValue, Stack, VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { setDeleteTask, setEditSeletedTask, setEditTaskModal, setUpdateTask, setViewParticularTaskModal, setOpenTaskCreationModal,
} from "../../Features/TaskSlice/TaskSlice";
import theme from "../../ChakraTheme";
import { ViewIcon } from "@chakra-ui/icons";

const priorityRank: Record<string, number> = { high: 3, medium: 2, low: 1 };

const AllTaskList = () => {
  const dispatch = useAppDispatch();
  const { taskList } = useAppSelector((state) => state.TaskSlice);

  const [sortKey, setSortKey] = useState<"priority" | "dueDate">("priority");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "pending"
  >("all");

  // Responsive values
  const boxWidth = useBreakpointValue({
    base: "90vw",
    sm: "80vw",
    md: "70vw",
    lg: "65vw",
  });
  
  const containerDirection = useBreakpointValue({
    base: "column",
    md: "row",
  }) as "column" | "row";
  
  const searchInputWidth = useBreakpointValue({
    base: "100%",
    sm: "100%",
    lg:"100%"
  });
  
  const taskItemWidth = useBreakpointValue({
    base: "85vw",
    sm: "70vw",
    md: "60vw",
    lg: "50vw",
  });
  
  const filteredAndSorted = useMemo(() => {
    const searchQuery = query.trim().toLowerCase();

    const filtered = searchQuery
      ? taskList.filter(
          (item: any) =>
            item.title.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery)
        )
      : taskList;

    const arr = [...filtered];
    arr.sort((a: any, b: any) => {
      let cmp =
        sortKey === "priority"
          ? priorityRank[a.priority] - priorityRank[b.priority]
          : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });

    return arr;
  }, [taskList, query, sortKey, sortDir]);

  const handleEdit = (id: string) => {
    dispatch(setEditTaskModal(true));
    dispatch(setEditSeletedTask(id));
  };

  const handleDelete = (id: string) => {
    dispatch(setDeleteTask(id));
  };

  const handleCompleteTask = (task: any, checked: any) => {
    if (checked) {
      const updatedTask = { ...task, completed: checked };
      dispatch(setUpdateTask(updatedTask));
    } else {
      const updatedTask = { ...task, completed: false };
      dispatch(setUpdateTask(updatedTask));
    }
  };

  const handleOpenViewParticularTaskModal = (taskId: any) => {
    dispatch(setViewParticularTaskModal(taskId));
  };

  const filteredTasks = filteredAndSorted?.filter((task: any) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return task.completed;
    if (filterStatus === "pending") return !task.completed;
    return true;
  });

  return (
    <Center>
      <Box
        mt={4}
        w={boxWidth}
        border="1px solid"
        borderColor="blue.400"
        boxShadow="lg"
        py={4}
        px={2}
      >
        <Flex 
        
          justifyContent="space-between" 
          flexDirection={containerDirection}
          gap={4}
          alignItems={containerDirection === "column" ? "flex-start" : "center"}
        >
          <Button
            size="sm"
            bg="blue.500"
            mb={3}
            fontSize="14px"
            borderRadius="0"
            w={containerDirection === "column" ? "100%" : "20%"}
            fontWeight={theme.fontWeights.bold}
            _hover={{ bgColor: "blue.400" }}
            color="white"
            onClick={() => dispatch(setOpenTaskCreationModal(true))}
          >
            Create Task
          </Button>

          {taskList.length > 0 && (
            <>
            <Flex 
              justifyContent="space-between" 
             
              mb={3} 
              width={containerDirection === "column" ? "100%" : "60vw"}
              flexDirection={containerDirection === "column" ? "column" : "row"}
              gap={2}
            >
              <Input
                placeholder="Search title or description…"
                size="sm"
                maxW={searchInputWidth}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <Stack direction={containerDirection} spacing={2}>
                <Menu>
                  <MenuButton
                    as={Button}
                    size="sm"
                    rightIcon={<ChevronDownIcon />}
                    width={containerDirection === "column" ? "100%" : "auto"}
                  >
                    Sort: {sortKey} {sortDir}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setSortKey("priority");
                        setSortDir("desc");
                      }}
                    >
                      Priority (high → low)
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortKey("priority");
                        setSortDir("asc");
                      }}
                    >
                      Priority (low → high)
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortKey("dueDate");
                        setSortDir("asc");
                      }}
                    >
                      Due date (earliest first)
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortKey("dueDate");
                        setSortDir("desc");
                      }}
                    >
                      Due date (latest first)
                    </MenuItem>
                  </MenuList>
                </Menu>

              
              </Stack>
            </Flex>
          
            </>
          )}
        </Flex>
{taskList.length>0 && (
      <HStack 
      spacing={4} 
      justify="center"
      flexWrap="wrap"
      
    >
      <Button
        size="sm"
        colorScheme={filterStatus === "all" ? "teal" : "gray"}
        onClick={() => setFilterStatus("all")}
      >
        All
      </Button>
      <Button
        size="sm"
        colorScheme={filterStatus === "completed" ? "green" : "gray"}
        onClick={() => setFilterStatus("completed")}
      >
        Completed
      </Button>
      <Button
        size="sm"
        colorScheme={filterStatus === "pending" ? "orange" : "gray"}
        onClick={() => setFilterStatus("pending")}
      >
        Pending
      </Button>
    </HStack>
)}
        <List spacing={0} overflowY="auto" height="60vh">
          {filteredTasks.length > 0 ? (
            filteredTasks?.map((task: any) => (
              <ListItem
                key={task.id}
                py={3}
                px={2}
                my={2}
                border="1px solid"
                borderColor="gray.200"
                _hover={{ bg: "gray.50" }}
                width={taskItemWidth}
                mx="auto"
              >
                <Flex justify="space-between" align="start">
                  <Text fontWeight="semibold">{task.title}</Text>

                  <HStack spacing={1}>
                    <Tooltip label="View Details">
                      <IconButton
                        aria-label="Edit"
                        size="sm"
                        icon={<ViewIcon />}
                        variant="ghost"
                        _hover={{ bg: "green.400", color: "white" }}
                        onClick={() =>
                          handleOpenViewParticularTaskModal(task.id)
                        }
                      />
                    </Tooltip>
                    <Tooltip label="Edit">
                      <IconButton
                        aria-label="Edit"
                        size="sm"
                        icon={<EditIcon />}
                        variant="ghost"
                        _hover={{ bg: "green.400", color: "white" }}
                        onClick={() => handleEdit(task.id)}
                      />
                    </Tooltip>
                    <Tooltip label="Delete">
                      <IconButton
                        aria-label="Delete"
                        size="sm"
                        icon={<DeleteIcon />}
                        variant="ghost"
                        _hover={{ bg: "red.200", color: "white" }}
                        onClick={() => handleDelete(task.id)}
                      />
                    </Tooltip>
                  </HStack>
                </Flex>

                <Text fontSize="sm" mt={1} mb={2} noOfLines={2}>
                  {task.description}
                </Text>

                <Flex 
                  justify="space-between" 
                  align="center"
                  // flexDirection={{ base: "column", sm: "row" }}
                  gap={2}
                 
                >
                  <Badge
                    rounded="sm"
                    fontSize="0.7rem"
                    colorScheme={
                      task.priority === "high"
                        ? "red"
                        : task.priority === "medium"
                        ? "yellow"
                        : "green"
                    }
                  >
                    {task.priority}
                  </Badge>

                  <Flex 
                    gap={3} 
                    alignItems="center"
                    // flexDirection={{ base: "column", sm: "row" }}
                  >
                    <FormControl display="flex" alignItems="center">
                      <FormLabel fontSize="sm" mb="0">
                        {task.completed ? "Completed" : "Pending"}
                      </FormLabel>
                      <Switch
                        isChecked={task.completed}
                        onChange={(e) =>
                          handleCompleteTask(task, e.target.checked)
                        }
                        colorScheme="green"
                      />
                    </FormControl>

                    <Text fontSize="xs" color="gray.600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))
          ) : (
            <Text textAlign="center" mt={4} fontWeight="bold" color="gray.500">
              {filterStatus === "completed" &&
                "You have 0 completed tasks now."}
              {filterStatus === "pending" && "You have 0 pending tasks now."}
              {filterStatus === "all" && "No tasks available."}
            </Text>
          )}
        </List>
      </Box>
    </Center>
  );
};

export default AllTaskList;