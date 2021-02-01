import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-left" hideProgressBar />
      <UserProfileProvider>
        <Router>
          <NavBar />
          <ApplicationViews />
        </Router>
      </UserProfileProvider>
    </div>
  );
}

export default App;
