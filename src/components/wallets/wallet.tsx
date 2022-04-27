import {Token} from "../Token"

 interface WalletProps {
    supportedTokens: Array<Token>
 }
 
 export const Wallet = ({ supportedTokens }: WalletProps ) => {
     return (<div>{supportedTokens.map((token: Token) =>
        <div><img src={token.image} width="15px"/> {token.name}: {token.address}</div>)}
        </div>
        )
 }