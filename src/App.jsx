import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import { LoginLayout, TenantLayout } from './layouts';
import { SignIn, Dashboard } from './views';

import './style.scss';

const App = () => {
    return (
        <>
            <div className="App">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/signin" replace />}
                        />
                        
                        <Route path="/signin" element={<LoginLayout />}>
                            <Route index element={<SignIn />} />
                        </Route>

                        <Route path="/:tenant" element={<TenantLayout />}>
                            <Route index element={<Dashboard />} />
                        </Route>

                    </Routes>
                </Router>
            </div>
        </>
    );
};

export default App;
