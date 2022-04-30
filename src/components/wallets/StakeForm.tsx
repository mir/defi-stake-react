import { Button, Input } from "@material-ui/core"
import { useEthers, useTokenBalance } from "@usedapp/core"
import { parseEther } from "ethers/lib/utils"
import { ChangeEvent, useState } from "react"
import { useStakeTokens } from "../../hooks/useStakeTokens"
import { formatTokenBalance, Token } from "../Token"

interface TokenFormProps {
    token: Token
}

export const StakeForm = ({token}: TokenFormProps) => {
    const { address, name } = token
    const { account } = useEthers()
    const tokenBalance = formatTokenBalance(useTokenBalance(address, account))

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

    return (
        <div>
            <Input onChange={handleInputChange}/>
            <Button
                onClick={handleStakeSubmit}
                color="primary"
                size="large"
                >
                Stake
            </Button>
        </div>
    )
}