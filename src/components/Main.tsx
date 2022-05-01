import { useEthers } from "@usedapp/core"
import ethHelper from "../eth-helper.json"
import deployments from "../chain-info/deployments/map.json"
import { constants } from "ethers"

import { getTokens, getToken } from "./Token"
import { Wallet } from "./wallets"

import { makeStyles } from "@material-ui/core"
import { textAlign } from "@mui/system"

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4) 
    }
}))

export const Main = () => {
    const classes = useStyles()
    const { chainId } = useEthers()    
    const chainName = chainId ? ethHelper[String(chainId)] : "dev"
    const dappTokenAddress = chainId ? deployments[String(chainId)]["DappToken"][0] : constants.AddressZero
    const tokenFarmAddress = chainId ? deployments[String(chainId)]["TokenFarm"][0] : constants.AddressZero

    const supportedTokens = getTokens(["weth", "dai"])
    supportedTokens.push(getToken("dapp", dappTokenAddress))    
    
    return (<div>    
        <h2 className={classes.title}>DappToken APP </h2>    
        <Wallet supportedTokens={supportedTokens} />       
        </div>)
}