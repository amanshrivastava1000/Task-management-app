import { useAppSelector } from "../../Store/Hooks";
import AllTaskList from "../AllTaskList/AllTaskList";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import OpendAllModal from "../OpenAllModal/OpendAllModal";
const Layout = () => {

  const { switchToDashBoard } = useAppSelector((state) => state.TaskSlice);

  return (
    <>
      <OpendAllModal />
      <NavBar />
      <Header /> 
      {switchToDashBoard ? (<Dashboard/>) : (<AllTaskList/>)}
    </>
  );
};

export default Layout;
