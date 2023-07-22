import { lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Tenant, Login } from './views/';

// const DashboardComponent = lazy(() =>
//   import("dashboardApp/DashboardComponent")
// );

import { CurrencyContext } from 'sharedApp/CurrencyContextProvider';
import { DarkModeProvider } from 'sharedApp/DarkModeContextProvider';

import './App.css';

const NotFound = lazy(() => import('sharedApp/NotFound'));

function App() {
    const [currency, setCurrency] = useState('$');

    return (
        <div className="App">
            <DarkModeProvider>
                <CurrencyContext.Provider value={currency}>
                    <button type="button" onClick={() => setCurrency('€')}>
                        Euro
                    </button>
                    <button type="button" onClick={() => setCurrency('$')}>
                        US Dollar
                    </button>
                    <Router>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/:tenant/" element={<Tenant />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </CurrencyContext.Provider>
            </DarkModeProvider>
        </div>
    );
}

export default App;
