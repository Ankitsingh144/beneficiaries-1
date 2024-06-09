import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import BeneficiaryList from './pages/beneficiaryList';
import AddBeneficiary from "./pages/AddBeneficiary";
import ViewBeneficiary from "./pages/ViewBeneficiary";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/view-beneficiary/:accountId"
            element={<ViewBeneficiary />}
          />
          <Route
            path="/edit-beneficiary/:accountId"
            element={<AddBeneficiary />}
          />
          <Route
            path="/add-beneficiary"
            element={<AddBeneficiary />}
          />
          <Route
            path="/"
            element={<BeneficiaryList />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
