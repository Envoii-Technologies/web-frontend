import { useParams } from 'react-router-dom';

export const Tenant = () => {
    const { tenant } = useParams();

    return <>Page {tenant}</>;
};
