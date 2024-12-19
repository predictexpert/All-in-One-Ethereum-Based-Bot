import { useContext } from "react"
import { UniswapContext } from "../contexts/UniswapContext"


const useUniswap = () => {
    return useContext(UniswapContext);
}

export default useUniswap;