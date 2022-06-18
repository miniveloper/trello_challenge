import moment from "moment";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./routers/Home";

function App() {
  const today = moment().format("YYYYMMDD");
  console.log(today);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/toDotoDo" element={<Home />}>
          <Route path={`/toDotoDo/${today}`} element={<Home />} />
          <Route path="/toDotoDo/:dates" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
