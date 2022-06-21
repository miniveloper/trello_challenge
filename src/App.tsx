import moment from "moment";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./routers/Home";

function App() {
  const today = moment().format("YYYYMMDD") + 1;
  console.log(today);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:dates" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
