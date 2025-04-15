import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import CaptureImage from "./pages/CaptureImage";
import UserDetails from "./pages/UserDetails";
import Preview from "./pages/Preview";
import MyDetails from "./pages/MyDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route path="/imageUpload" element={<CaptureImage />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/myDetails" element={<MyDetails />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
