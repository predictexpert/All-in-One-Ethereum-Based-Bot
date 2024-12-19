import { createContext, useEffect, useReducer } from 'react';
import tokenReducer, { initTokens, tokenStorage } from '../reducers/tokenReducer';

export const TokenDetailsContext = createContext();

// id, symbol, name, asset_platform_id, platforms, image, contract address, 

const sampleTokenDetailsDatabase = [
    {
        symbol: 'WBNB',
        address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        logoUrl: 'sampleLogoUrl',
        decimal: '18',
    },
];

const TokenDetailsProvider = ({ children }) => {
    const [tokens, dispatch] = useReducer(tokenReducer, [], initTokens);

    useEffect(() => {
        localStorage.setItem(tokenStorage, JSON.stringify(tokens));
    }, [tokens]);

    const tokenDatabase = {
        tokens,
        dispatch,
    };

    return <TokenDetailsContext.Provider value={tokenDatabase}>{children}</TokenDetailsContext.Provider>;
};
