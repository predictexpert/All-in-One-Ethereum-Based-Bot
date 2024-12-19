import { useContext } from 'react';
import { Erc20Context } from '../contexts/Erc20Context';

const useErc20 = () => {
    return useContext(Erc20Context);
};

export default useErc20;
