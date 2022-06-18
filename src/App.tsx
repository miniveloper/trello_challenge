import moment from "moment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routers/Home";

function App() {
  const today = moment().format("YYYYMMDD");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:dates" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
