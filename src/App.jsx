import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import { Login } from './views/shared';
import { Overview } from './views/admin/';
import {
    CreateTeam,
    CreateUser,
    Dashboard,
    Cards,
    Users,
    CreateCard,
    ViewCard,
} from './views/tenant/';
import { AdminLayout, TenantLayout, LoginLayout } from './layouts';

import './style.scss';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<LoginLayout />}>
                        <Route index element={<Login />} />
                    </Route>

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Overview />} />
                    </Route>
                    <Route path="/:tenant" element={<TenantLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="settings/users" element={<Users />} />
                        <Route
                            path="settings/users/create"
                            element={<CreateUser />}
                        />
                        <Route
                            path="settings/teams/"
                            element={<CreateTeam />}
                        />

                        <Route path="cards" element={<Cards />} />
                        <Route path="cards/create" element={<CreateCard />} />
                        <Route path="cards/:id" element={<ViewCard />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
