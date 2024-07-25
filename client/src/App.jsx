import 'leaflet/dist/leaflet.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import Main from './pages/Main';
import Messages from './pages/Messages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
