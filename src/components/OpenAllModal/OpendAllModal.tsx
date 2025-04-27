import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import TaskCreationModal from "../Modals/TaskCreationModal/TaskCreationModal";
import ViewParticularTaskModal from "../Modals/ViewParticularTaskModal/ViewParticularTaskModal";

const OpendAllModal = () => {
  return (
    <>
      <TaskCreationModal />
      <EditTaskModal />
      <ViewParticularTaskModal/>
    </>
  );
};

export default OpendAllModal;
