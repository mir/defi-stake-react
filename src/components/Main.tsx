import { useEthers } from "@usedapp/core"
import ethHelper from "../eth-helper.json"
import deployments from "../chain-info/deployments/map.json"
import { constants } from "ethers"

import { getTokens, getToken } from "./Token"

export const Main = () => {
    const { chainId } = useEthers()    
    const chainName = chainId ? ethHelper[String(chainId)] : "dev"
    const dappTokenAddress = chainId ? deployments[String(chainId)]["DappToken"][0] : constants.AddressZero
    const tokenFarmAddress = chainId ? deployments[String(chainId)]["TokenFarm"][0] : constants.AddressZero

    const supportedTokens = getTokens(["weth", "dai", "fau"])
    supportedTokens.push(getToken("dapp", dappTokenAddress))    
    
    return (<div>
        chainName: {chainName}<br/>        
        tokenFarmAddress: {tokenFarmAddress}<br/>
        {supportedTokens.map((token) =>
            <div><img src={token.image} width="20px"/> {token.name}: {token.address}</div>
        )}        
        </div>)
}