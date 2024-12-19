import { createContext } from 'react';
import useBlockchain from '../hooks/useBlockchain';
import Web3 from 'web3';
import erc20Abi from '../../data/erc-20-abi.json';
import { ethers } from 'ethers';

export const Erc20Context = createContext();

const Erc20Provider = ({ children }) => {
    const { getContract, provider } = useBlockchain();

    // TOKEN DETAILS FETCHER

    const getTokenBalance = async (owner, tokenAddress) => {
        const web3 = new Web3(provider);

        if (!web3.utils.isAddress(tokenAddress)) return 0;
        try {
            const contract = getContract(erc20Abi, tokenAddress);
            return await contract.methods.balanceOf(owner).call();
        } catch (err) {
            console.log(err.toString());
        }

        return false;
    };

    const getFormattedTokenBalance = async (owner, tokenAddress) => {
        const web3 = new Web3(provider);

        if (!web3.utils.isAddress(tokenAddress)) return 0;

        try {
            const contract = getContract(erc20Abi, tokenAddress);
            const balance = await getTokenBalance(owner, tokenAddress);
            const decimal = await contract.methods.decimals().call();
            const floatBalance = parseFloat(ethers.utils.formatUnits(balance, decimal));
            return floatBalance > 0 ? floatBalance.toFixed(2) : floatBalance.toFixed(6);
        } catch (err) {
            console.log(err.toString());
        }

        return false;
    };

    const getTokenSymbol = async tokenAddress => {
        try {
            const contract = getContract(erc20Abi, tokenAddress);
            return await contract.methods.symbol().call();
        } catch (err) {
            console.log(err.toString());
        }

        return false;
    };

    const getTokenDecimal = async tokenAddress => {
        try {
            const contract = getContract(erc20Abi, tokenAddress);
            return await contract.methods.decimals().call();
        } catch (err) {
            console.log(err.toString());
        }

        return false;
    };

    const erc20 = {
        getTokenBalance,
        getFormattedTokenBalance,
        getTokenDecimal,
        getTokenSymbol,
    };
    return <Erc20Context.Provider value={erc20}>{children}</Erc20Context.Provider>;
};

export default Erc20Provider;
