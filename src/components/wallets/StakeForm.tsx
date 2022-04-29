import { Button, Input } from "@material-ui/core"
import { useEthers, useTokenBalance } from "@usedapp/core"
import { ChangeEvent, useState } from "react"
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
    return (
        <div>
            <Input onChange={handleInputChange}/>
            <Button
                color="primary"
                size="large"
                >
                Stake
            </Button>
        </div>
    )
}