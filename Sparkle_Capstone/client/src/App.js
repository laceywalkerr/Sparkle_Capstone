import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import "./App.css";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <div className="App">

      <UserProfileProvider>
        <Router>
          <AppHeader />
          <ApplicationViews />
        </Router>
      </UserProfileProvider>
    </div>
  );
}

export default App;