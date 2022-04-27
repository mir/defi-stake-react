import { useEthers } from "@usedapp/core"
import ethHelper from "../eth-helper.json"
import deployments from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import ethConfig from "../eth-config.json"

import { imgPaths } from "./imageHelper"

export type Token = {
    image: string
    address: string
    name: string
  }

function getToken(_name:string): Token {
    return {
        image: imgPaths[_name],
        address: ethConfig["networks"]["rinkeby"][_name + "_token"],
        name: _name.toUpperCase()}    
}

function getTokens(tokenNames: Array<string>): Array<Token> {
    const tokens: Array<Token> = []
    tokenNames.forEach((name) => tokens.push(getToken(name)))
    return tokens
}

export const Main = () => {
    const { chainId } = useEthers()    
    const chainName = chainId ? ethHelper[String(chainId)] : "dev"
    const dappTokenAddress = chainId ? deployments[String(chainId)]["DappToken"][0] : constants.AddressZero
    const tokenFarmAddress = chainId ? deployments[String(chainId)]["TokenFarm"][0] : constants.AddressZero

    const supportedTokens = getTokens(["weth", "dai", "fau"])
    
    return (<div>
        chainName: {chainName}<br/>       
        dappTokenAddress: {dappTokenAddress}<br/>
        tokenFarmAddress: {tokenFarmAddress}<br/>
        {supportedTokens.map((token) =>
            <div><img src={token.image} width="20px"/> {token.name}: {token.address}</div>
        )}        
        </div>)
}