import "leaflet/dist/leaflet.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Messages from "./pages/Messages";
import UserCars from "./pages/UserCars";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<PrivateRoute element={<Main />} />} />
        <Route
          path="/messages"
          element={<PrivateRoute element={<Messages />} />}
        />
        <Route
          path="/car-details/:id"
          element={<PrivateRoute element={<CarDetails />} />}
        />
        <Route
          path="/user-cars"
          element={<PrivateRoute element={<UserCars />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
