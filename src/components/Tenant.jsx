import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Tenant() {
    const [ tenant, setTenant ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

    const navigate = useNavigate();

    const tenantList = [
        "sicatron",
        "wkw"
    ]

    const handleTenantCheckIn = () =>
    {
        if(tenantList.includes(tenant.toLowerCase()))
        {
            navigate('/' + tenant)
        }
        else
        {
            setErrorMessage("Kein Gültiger Kunde.");
        }
    }

    return (
        <>
            <div>
                <input type="text" onChange={(e) => setTenant(e.target.value)} />.envoii.de
                <br />
                <button onClick={() => handleTenantCheckIn()}>Weiter</button>


                { errorMessage && <p>{ errorMessage }</p> }
            </div>
        </>
    );
}
