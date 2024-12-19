import { useContext } from 'react';
import { BlockchainContext } from '../contexts/BlockchainContext';

const useBlockchain = () => {
    return useContext(BlockchainContext);
}

export default useBlockchain;