import { useReducer } from 'react';

export const TOKEN_ACTIONS = Object.freeze({
    UPDATE_TOKEN: 'updateToken',
    RESET_TOKEN: 'reset',
    UPDATE_CONTRACT: 'updateContract',
    UPDATE_NAME: 'updateName',
    UPDATE_AMOUNT: 'updateAmount',
    UPDATE_SYMBOL: 'updateSymbol',
});

const tokenInitializer = () => {
    const data = { name: '', symbol: '', contract: '', amount: '' };

    return data;
};

const tokenReducer = (token, action) => {
    switch (action.type) {
        case TOKEN_ACTIONS.UPDATE_TOKEN:
            const { contract, name, symbol, amount } = action.payload.data;
            return {contract, name, symbol, amount};
        case TOKEN_ACTIONS.RESET_TOKEN:
            return tokenInitializer();

        case TOKEN_ACTIONS.UPDATE_CONTRACT:
            
            return {...token, contract: action.payload.contract};
        case TOKEN_ACTIONS.UPDATE_NAME:
            return {...token, name: action.payload.name};
        case TOKEN_ACTIONS.UPDATE_SYMBOL:
            return {...token, symbol: action.payload.symbol};
        case TOKEN_ACTIONS.UPDATE_AMOUNT:
            return {...token, amount: action.payload.amount};
        default:
            throw new Error('Invalid token action');
    }
};

const useToken = () => {
    const [token, dispatchToken] = useReducer(tokenReducer, {}, tokenInitializer);

    return [token, dispatchToken];
};

export default useToken;
