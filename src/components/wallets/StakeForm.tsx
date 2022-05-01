import { Button, CircularProgress, Input } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Snackbar } from "@mui/material"
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

    const { approveAndStake, state: approveAndStakeERC20State } = useStakeTokens(address)

    const handleStakeSubmit = () => {
        const amountAsWei = parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveAndStakeERC20State.status === "Mining"
    const [showERC20ApprovalSuccess, setShowERC20ApprovalSuccess] = useState(false)
    const [showStakeSuccess, setShowStakeSuccess] = useState(false)
    const handleCloseSnack = () => {
        setShowERC20ApprovalSuccess(false)
        setShowStakeSuccess(false)
    }

    useEffect(() => {        
        if (notifications.filter((notification) => 
            notification.type === "transactionSucceed" &&
            notification.transactionName === TRANSACTION_NAMES.ERC20_APPROVE).length > 0) {
                setShowERC20ApprovalSuccess(true)
                setShowStakeSuccess(false)
        }
        if (notifications.filter((notification) => 
            notification.type === "transactionSucceed" &&
            notification.transactionName === TRANSACTION_NAMES.STAKE_TOKEN).length > 0) {
                setShowERC20ApprovalSuccess(false)
                setShowStakeSuccess(true)
        }
    }, [notifications, showStakeSuccess, showERC20ApprovalSuccess])
    return (
        <>
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
            <Snackbar 
                open={showERC20ApprovalSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    ERC20 transfer approved. It is time to approbe send transaction.
                </Alert>
            </Snackbar>
            <Snackbar 
                open={showStakeSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Token staked!
                </Alert>
            </Snackbar>
        </>
    )
}