import { useEffect } from 'react';
import axios from 'axios';

// import * as API from './api';

export const TenantList = () => {
    useEffect(() => {

        // const getAll = async () => {
        //     API.subscribe(({result})=>{
        //         console.log(result);
        //      });
        // }

        // getAll();
        
    }, []);

    const handleSend = async () => {
        // axios.post(`${API.API_URL}/api/calc/sum`, { method: 'POST', body: {ok: true} })
        // .then(res => res.json()).then(data => console.logfdata);

        // const data = await axios.post(`${API.API_URL}/api/calc/sum`, {
        //     firstName: 'Rick',
        //     lastName: 'Reich'
        //   });

        // console.log(data);
    }

    return <><button onClick={handleSend}>Test</button></>;
};

// import { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// import { useSocket } from '../../../context/SocketContextProvider';

// export const TenantList = ({ loadingState }) => {
//     const [tenants, setTenants] = useState([]);
//     const [ isLoading, setIsLoading ] = useState(loadingState);

//     const { socket, connect, disconnect, isConnected, emit } = useSocket();

//     useEffect(() => {
//         connect('http://localhost:3000');

//         if (socket) {
//             emit('CLIENT:GET_ALL_TENANTS');
//         }

//         return () => {
//             disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         socket.on('ADMIN:GET_ALL_TENANTS', function (data) {
//             setTenants(data);
//             setIsLoading(false);
//         });
//     }, [socket]);

//     const handleDeleteTenant = (tenant) =>
//     {
//         if (socket) {
//             emit('CLIENT:DELETE_TENANT', tenant);
//         }
//     }

//     return (
//         <>
//             {
//                 isLoading ? <p>loading...</p> : <p>FINISHED LOADING...</p>
//             }
//             {tenants.length >= 1 && (
//                 <>
//                     <h2>Tenants</h2>
//                     <ul>
//                         {tenants.map((tenant, i) => (
//                             <li key={i}>
//                                 <Link to={`/${tenant.name}`}>{tenant.name} - {tenant.title}</Link> <button onClick={() => handleDeleteTenant(tenant.name)}>Delete</button>
//                             </li>
//                         ))}
//                     </ul>
//                 </>
//             )}
//         </>
//     );
// };
