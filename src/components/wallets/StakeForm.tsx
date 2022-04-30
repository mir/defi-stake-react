import { Button, CircularProgress, Input } from "@material-ui/core"
import { useEthers, useNotifications, useTokenBalance } from "@usedapp/core"
import { parseEther } from "ethers/lib/utils"
import { ChangeEvent, useEffect, useState } from "react"
import { TRANSACTION_NAMES, useStakeTokens } from "../../hooks/useStakeTokens"
import { formatTokenBalance, Token } from "../Token"

interface TokenFormProps {
    token: Token
}

export const StakeForm = ({token}: TokenFormProps) => {
    const { address, name } = token
    const { account } = useEthers()
    const tokenBalance = formatTokenBalance(useTokenBalance(address, account))
    const {notifications} = useNotifications()

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
    }

    const { approveAndStake, approveERC20State } = useStakeTokens(address)

    const handleStakeSubmit = () => {
        const amountAsWei = parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveERC20State.status === "Mining"

    useEffect(() => {        
        if (notifications.filter((notification) => 
            notification.type === "transactionSucceed" &&
            notification.transactionName === TRANSACTION_NAMES.ERC20_APPROVE).length > 0) {
        }
        if (notifications.filter((notification) => 
            notification.type === "transactionSucceed" &&
            notification.transactionName === TRANSACTION_NAMES.STAKE_TOKEN).length > 0) {
        }
    }, [notifications])
    return (
        <div>
            <Input onChange={handleInputChange}/>
            <Button
                onClick={handleStakeSubmit}
                color="primary"
                size="large"
                disabled={isMining }
                >
                {isMining? <CircularProgress size={26}/> : "Stake"}
            </Button>
        </div>
    )
}