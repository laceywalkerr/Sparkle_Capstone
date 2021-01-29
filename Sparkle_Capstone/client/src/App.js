import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
// import { ToastContainer } from "react-toastify";
import "./App.css";
// import "react-toastify/dist/ReactToastify.css";
// import AppHeader from "./components/AppHeader";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" hideProgressBar />
      <UserProfileProvider>
        <Router>
          {/* <AppHeader /> */}
          <ApplicationViews />
        </Router>
      </UserProfileProvider>
    </div>
  );
}

export default App;