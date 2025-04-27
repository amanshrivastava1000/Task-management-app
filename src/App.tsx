import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
