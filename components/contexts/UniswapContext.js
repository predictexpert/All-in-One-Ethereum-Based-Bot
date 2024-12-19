import { createContext } from 'react';
import useBlockchain from '../hooks/useBlockchain';
import pancakeswapAbi from '../../data/pancakeswap-router-v2-abi.json';
import usePersist from '../hooks/usePersist';
import { ethers } from 'ethers';
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from '@pancakeswap-libs/sdk-v2';
import useErc20 from '../hooks/useErc20';
import Accounts from 'web3-eth-accounts';

import erc20abi from '../../data/erc-20-abi.json';
import Web3 from 'web3';
import abiDecoder from 'abi-decoder';

const TRADE_TYPES = Object.freeze({
    SEND_EXACT_ETH: 'send_exact_eth',
    RECEIVE_EXACT_ETH: 'receive_exact_eth',
    EXACT_TOKENS: 'exact_tokens',
});

export const UniswapContext = createContext();

const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const defaultGasPrice = ethers.utils.parseUnits('5', 'gwei');
const defaultGas = ethers.utils.parseUnits('500000', 'wei');
const WBNBContract = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';

const UniswapProvider = ({ children }) => {
    const { getContract, provider, getContractWithSigner, isValidAddress, getWeb3Provider, getSigner } =
        useBlockchain();
    const { getTokenDecimal, getTokenSymbol } = useErc20();
    const [router, setRouter] = usePersist('uniswapRouter', defaultRouter);

    const getUniswapContract = () => {
        return getContract(pancakeswapAbi, router);
    };

    const getAmountOutMin = async (wallet, amountIn, tokenIn, tokenInDecimal, tokenOut, tokenOutDecimal, slippage) => {
        try {
            const slippageTolerance = new Percent(Math.floor(slippage * 100).toString(), '10000');
            const tokenA = new Token(ChainId.MAINNET, ethers.utils.getAddress(tokenIn), tokenInDecimal);
            const tokenB = new Token(ChainId.MAINNET, ethers.utils.getAddress(tokenOut), tokenOutDecimal);
            const pair = await Fetcher.fetchPairData(tokenA, tokenB, wallet);
            const route = new Route([pair], tokenA);
            const trade = new Trade(route, new TokenAmount(tokenA, amountIn), TradeType.EXACT_INPUT);
            const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString();
            const formattedAmountOutMin = ethers.utils.formatUnits(amountOutMin, tokenOutDecimal);

            return { data: { amountOutMin, amountIn }, formattedAmountOutMin };
        } catch (ex) {
            console.log(ex);
            throw new Error('Error fetching amount out min');
        }
    };

    const getAmountOutMinUnformattedInput = async (wallet, amountIn, tokenIn, tokenOut, slippage) => {
        const tokenInDecimal = await getTokenDecimal(tokenIn);
        const tokenOutDecimal = await getTokenDecimal(tokenOut);
        const amountInBN = ethers.utils.parseUnits(amountIn.toString(), tokenInDecimal);

        return getAmountOutMin(wallet, amountInBN, tokenIn, tokenInDecimal, tokenOut, tokenOutDecimal, slippage);
    };

    const getAllowance = async tokenAddress => {
        if (!isValidAddress(tokenAddress)) return;
        try {
            const contract = getContract(erc20abi, tokenAddress);
            const allowance = await contract.methods.allowance(process.env.REACT_APP_WALLET_ADDRESS, router).call();
            return allowance;
        } catch (err) {
            return new Error('Cannot get allowance!');
        }
    };

    const hasAllowance = async tokenAddress => {
        if (!isValidAddress(tokenAddress)) return false;
        const allowance = await getAllowance(tokenAddress);
        return !ethers.BigNumber.from(allowance).isZero();
    };

    const approveToSpend = async tokenAddress => {
        // try {
        //     const web3 = new Web3(provider);
        //     const gasPrice = await web3.eth.getGasPrice();
        //     const gas = await web3.eth.estimateGas().call();
        //     // const contract = getContractWithSigner(erc20abi, tokenAddress);
        //     // const spendAmount = ethers.utils.parseEther('1000000000000000000000000000000');
        //     // console.log('hasjdhajkshkdjhasjkdhjkashkj')
        //     // console.log(spendAmount);
        //     // const approve = contract.approve(router, spendAmount, {
        //     //     gasPrice,
        //     //     gasLimit: ethers.parseUnits('10000000', 'wei'),
        //     // });
        //     //const web3 = new Web3(provider);
        //     const mnemonic = ethers.Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC).privateKey;
        //     const contract = getContract(erc20abi, tokenAddress, {
        //         from: process.env.REACT_APP_WALLET_ADDRESS,
        //     });
        //     const spendAmount = ethers.utils.parseUnits('999999999999999999999999999999999999999999', '18');
        //     const approve = await contract.methods.approve(router, spendAmount);
        //     const txx = {
        //         from: process.env.REACT_APP_WALLET_ADDRESS,
        //         to: tokenAddress,
        //         gas,
        //         gasPrice,
        //         data: approve,
        //     };
        //     console.log('here');
        //     const sign = await web3.eth.accounts.signTransaction(txx, mnemonic);
        //     const tx = await web3.eth.sendSignedTransaction(sign.rawTransaction);
        //     console.log(tx);
        //     return approve;
        // } catch (err) {
        //     console.log(err);
        //     throw new Error('Cannot approve spender');
        // }
    };

    const getUniswapContractWithSigner = () => {
        const signer = getSigner();
        const contract = new ethers.Contract(router, pancakeswapAbi, signer);
        return contract;
    };

    const swapEther = async (amountIn, amountOutMin, tokenIn, tokenOut) => {
        const web3 = new Web3(provider);
        const tradeType =
            web3.utils.toChecksumAddress(tokenIn) === web3.utils.toChecksumAddress(WBNBContract)
                ? TRADE_TYPES.SEND_EXACT_ETH
                : web3.utils.toChecksumAddress(tokenOut) === web3.utils.toChecksumAddress(WBNBContract)
                ? TRADE_TYPES.RECEIVE_EXACT_ETH
                : TRADE_TYPES.EXACT_TOKENS;

        console.log({ tradeType, amountIn, amountOutMin });

        const contract = getUniswapContractWithSigner();
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
        const gasPrice = ethers.utils.parseUnits(JSON.parse(localStorage.getItem('gasFee') || '5', 'gwei'));
        let gasLimit = 300000;

        console.log({ tradeType, amountIn, amountOutMin, gasPrice, gasLimit });

        switch (tradeType) {
            case TRADE_TYPES.SEND_EXACT_ETH:
                const tx = await contract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                    amountIn,
                    amountOutMin,
                    [tokenIn, tokenOut],
                    process.env.REACT_APP_WALLET_ADDRESS,
                    deadline,
                    { gasPrice, gasLimit }
                );

                console.log({ tx });
                return tx.wait();

            case TRADE_TYPES.RECEIVE_EXACT_ETH:
                const tx1 = await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
                    amountIn,
                    amountOutMin,
                    [tokenIn, tokenOut],
                    process.env.REACT_APP_WALLET_ADDRESS,
                    deadline,
                    { gasPrice, gasLimit }
                );

                console.log({ tx1 });
                return tx1.wait();

            case TRADE_TYPES.EXACT_TOKENS:
                const tx2 = await contract.swapExactTokensForTokens(
                    amountIn,
                    amountOutMin,
                    [tokenIn, WBNBContract, tokenOut],
                    process.env.REACT_APP_WALLET_ADDRESS,
                    deadline,
                    { gasPrice, gasLimit }
                );

                console.log({ tx2 });

                return tx2.wait();
        }
    };

    const swap = async (amountIn, amountOutMin, tokenIn, tokenOut) => {
        const web3 = new Web3(provider);

        const tradeType =
            web3.utils.toChecksumAddress(tokenIn) === web3.utils.toChecksumAddress(WBNBContract)
                ? TRADE_TYPES.SEND_EXACT_ETH
                : web3.utils.toChecksumAddress(tokenOut) === web3.utils.toChecksumAddress(WBNBContract)
                ? TRADE_TYPES.RECEIVE_EXACT_ETH
                : TRADE_TYPES.EXACT_TOKENS;

        console.log({ tradeType, amountIn, amountOutMin });

        const contract = getUniswapContract();
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
        const gasPrice = ethers.utils.parseUnits(JSON.parse(localStorage.getItem('gasFee') || '5', 'gwei'));
        let gasLimit = 300000;
        web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_PRIVATE_KEY);
        web3.eth.defaultAccount = process.env.REACT_APP_WALLET_ADDRESS;
        const nonce = await web3.eth.getTransactionCount(process.env.REACT_APP_WALLET_ADDRESS, 'latest');
        console.log(contract);
        console.log({ tradeType, amountIn, amountOutMin, gasPrice, gasLimit });

        switch (tradeType) {
            case TRADE_TYPES.SEND_EXACT_ETH:
                contract.methods
                    .swapExactETHForTokensSupportingFeeOnTransferTokens(
                        amountOutMin,
                        [tokenIn, tokenOut],
                        process.env.REACT_APP_WALLET_ADDRESS,
                        deadline
                    )
                    .send({
                        gasPrice,
                        gas: gasLimit,
                        from: process.env.REACT_APP_WALLET_ADDRESS,
                        to: router,
                        nonce,
                        value: amountIn,
                    })
                    .on('receipt', res => {
                        console.log(res);
                    });
                console.log({ amountIn });
                // const options = {
                //     gasPrice,
                //     gas: gasLimit,
                //     from: process.env.REACT_APP_WALLET_ADDRESS,
                //     to: router,
                //     data,
                //     nonce,
                //     value: amountIn,
                // };

                // const rawTx = await web3.eth.accounts.signTransaction(options, process.env.REACT_APP_PRIVATE_KEY);

                // web3.eth.sendSignedTransaction(rawTx.rawTransaction).then((error, hash) => {
                //     if (!error) {
                //         console.log(`Transaction successful: ${hash}`);
                //     } else {
                //         console.log('ERROR');
                //         console.log(error);
                //     }
                // });

                // const rawTx = web3.eth.signTransaction(tx);

                // console.log({ tx });
                // return tx.wait();
                break;

            case TRADE_TYPES.RECEIVE_EXACT_ETH:
                const tx1 = await contract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(
                    amountIn,
                    amountOutMin,
                    [tokenIn, tokenOut],
                    process.env.REACT_APP_WALLET_ADDRESS,
                    deadline,
                    { gasPrice, gasLimit }
                );

                console.log({ tx1 });
                return tx1.wait();

            case TRADE_TYPES.EXACT_TOKENS:
                const tx2 = await contract.methods.swapExactTokensForTokens(
                    amountIn,
                    amountOutMin,
                    [tokenIn, WBNBContract, tokenOut],
                    process.env.REACT_APP_WALLET_ADDRESS,
                    deadline,
                    { gasPrice, gasLimit }
                );

                console.log({ tx2 });

                return tx2.wait();
        }
    };

    const uniswap = {
        getUniswapContract,
        getAmountOutMin,
        hasAllowance,
        approveToSpend,
        getAmountOutMinUnformattedInput,
        getUniswapContractWithSigner,
        swap,
        setRouter,
    };

    return <UniswapContext.Provider value={uniswap}>{children}</UniswapContext.Provider>;
};

export default UniswapProvider;
