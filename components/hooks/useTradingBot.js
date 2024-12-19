import { useContext } from 'react';
import { TradingBotContext } from '../contexts/TradingBotContext';

const useTradingBot = () => {
    return useContext(TradingBotContext);
};

export default useTradingBot;
