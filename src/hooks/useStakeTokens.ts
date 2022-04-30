import { useContractFunction, useEthers } from "@usedapp/core"
import { constants, Contract, utils } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import erc20abi from "../chain-info/contracts/dependencies/OpenZeppelin/openzeppelin-contracts@4.5.0/IERC20.json"
import deployments from "../chain-info/deployments/map.json"
import { useEffect, useState } from "react"

export const useStakeTokens = (tokenAddress: string) => {
    const {chainId} = useEthers() 
    const {abi} = TokenFarm
    const tokenFarmAddress = chainId ? deployments[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const ERC20Abi = erc20abi.abi
    const erc20Interface = new utils.Interface(ERC20Abi)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)

    const { send: approveErc20Send, state: approveERC20State } =
     useContractFunction(
         erc20Contract,
         "approve",
          {transactionName:"Approve ERC20 transfer "}
          );

    const [amountToStake, setAmountToStake] = useState("0")
    const approveAndStake = (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(tokenFarmAddress, amount)
    }
    
    const { send: stakeSend, state: stakeState } =
     useContractFunction(
        tokenFarmContract,
         "stakeToken",
          {transactionName:"Stake token"}
          )    

    useEffect(() => {
        if (approveERC20State.status === "Success") {
            stakeSend(amountToStake, tokenAddress)
        }
    }, [approveERC20State])
    return {approveAndStake, approveERC20State }

}