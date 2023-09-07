import { useEffect, useState } from "react";
import axios from 'axios';

export const useApi = (url, options) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const axiosInstance = axios.create({
        timeout: 8000,
    });

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axiosInstance(url, options);
            setData(response);
        } catch (err) {
            setError(err);
        }

        setIsLoading(false);
    }

    const callApi = () => {
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, isLoading, error, callApi };
}