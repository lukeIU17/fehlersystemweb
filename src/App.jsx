import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import MaterialButtons from './MaterialButtons.jsx';
import MaterialOverview from "./MaterialOverview.jsx";
import MaterialCreate from "./MaterialCreate.jsx";
import ErrorOverview from "./ErrorOverview.jsx";
import ErrorReport from "./ErrorReport.jsx";
import ErrorDetails from "./ErrorDetails.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/0010" element={<MaterialButtons />} />
                <Route path="/0011" element={<MaterialCreate />} />
                <Route path="/0100" element={<MaterialOverview />} />
                <Route path="/0101" element={<ErrorOverview />} />
                <Route path="/0110" element={<ErrorReport />} />
                <Route path="/0111" element={<ErrorDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
