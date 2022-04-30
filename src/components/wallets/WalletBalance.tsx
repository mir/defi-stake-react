import { formatTokenBalance, Token } from "../Token";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { BalanceMsg } from "../BalanceMsg";

export interface WalletBalanceProps {
    token: Token 
}

export const WalletBalance = ({token}: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formattedTokenBalance = formatTokenBalance(tokenBalance)
    return (
        <BalanceMsg 
            label={`Unstaked ${name} balance:`}                     
            image={image}
            amount={formattedTokenBalance} /> 
    )
}