import Main from "@Pages/Main/Main";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/front/" element={<Main />} />
    </Routes>
  );
}

export default App;
