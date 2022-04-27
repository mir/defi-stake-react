import { Token } from "@usedapp/core"

 interface WalletProps {
    supportedTokens: Array<Token>
 }
 
 export const Wallet = ({ supportedTokens }: WalletProps ) => {
     return (<div>Wallet</div>)
 }