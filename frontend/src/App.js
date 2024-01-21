import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { userDetails } from './source/form_source';

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequiredAuth>
                <Home />
              </RequiredAuth>
            }
          />
          <Route path="/signup" element={<Details inputs={userDetails} />} />
          <Route
            path="/profile"
            element={
              <RequiredAuth>
                <UserProfile />
              </RequiredAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
