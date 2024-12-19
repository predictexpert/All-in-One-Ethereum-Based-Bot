import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const fetchDetails = async (network, address) => {
    if (!address || !network) return;
    let result;
    try {
        result = await axios.get(network.getFetcherUrl(address));
    } catch (error) {
        console.log(error.response)
        return [-1, error];
    }

    return [1, result.data.data];
};

const useTokenDetails = (network, tokenAddress) => {
    const [value, setValue] = useState(async () => await fetchDetails(network, tokenAddress));

    useEffect(async () => {
        setValue(await fetchDetails(network, tokenAddress));
    }, [tokenAddress, network]);

    return [value, setValue];
};

export default useTokenDetails;
