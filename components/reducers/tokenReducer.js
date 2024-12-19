import { TokenReducerActionTypes } from '../../enums/tokenReducerActionTypes';

const initialState = [];
export const tokenStorage = 'tokenStorage';

// id, symbol, name, asset_platform_id, platforms, image (this), contract_address as address, 
// to fetch decimal, symbol, 

export const initTokens = (initialValue = initialState) => JSON.parse(localStorage.getItem(storageKey)) || initialValue;

export default tokenReducer = (tokens, { type, token }) => {
    switch (type) {
        case TokenReducerActionTypes.INSERT:
            return !tokens.find(item => item.address === token.address) ? [...tokens, token] : tokens;
        case TokenReducerActionTypes.DELETE:
            return tokens.filter(item => item.address !== token.address);
        default:
            return 'Token action type not found!';
    }
};
