import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Resources from './components/Resources';
import Tenant from './components/Tenant';

import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/:tenant" element={<Resources />} />
                    <Route path="/login" element={<Tenant />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
