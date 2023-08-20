import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { Link } from 'react-router-dom';

import { TenantList } from './../../components/admin/';

export const Overview = () => {
    const authContext = useContext(AuthContext);

    const [tenants, setTenants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tenantInfo, setTenantInfo] = useState({
        name: '',
        title: '',
        email: ''
    });

    const handleChangeTenantInfo = (e) => {
        const value = e.target.value;

        setTenantInfo({
            ...tenantInfo,
            [e.target.name]: value,
        });
    };

    const handleSubmitNewTenant = (e) => {
        e.preventDefault();

        console.log(tenantInfo);
    };

    if (!authContext.isAuthenticated) {
        return <>loading...</>;
    } else {
        return (
            <>
                <h1>Admin Overview</h1>

                <button onClick={() => authContext.logout()}>Logout</button>

                {/* <p>Connected: {isConnected ? 'true' : 'false'}</p> */}

                {isLoading ? (
                    <p>loading</p>
                ) : (
                    <div>
                        <h2>Add new Tenant</h2>

                        <form onSubmit={(e) => handleSubmitNewTenant(e)}>
                            <label>
                                Tenant title:
                                <br />
                                <input
                                    type="text"
                                    name="title"
                                    value={tenantInfo.title}
                                    onChange={handleChangeTenantInfo}
                                />
                            </label>
                            <br />
                            <label>
                                Tenant abbreviation:
                                <br />
                                <input
                                    type="text"
                                    name="name"
                                    value={tenantInfo.name}
                                    onChange={handleChangeTenantInfo}
                                />
                            </label>
                            <br />
                            <label>
                                Tenant E-Mail:
                                <br />
                                <input
                                    type="text"
                                    name="email"
                                    value={tenantInfo.email}
                                    onChange={handleChangeTenantInfo}
                                />
                            </label>
                            <br />
                            <input
                                type="submit"
                                value="Submit"
                            />
                        </form>

                        {tenantInfo && tenantInfo.name}
                    </div>
                )}

                <TenantList />
            </>
        );
    }
};
