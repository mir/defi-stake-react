import { Box, Tab } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { ChangeEvent, useState } from "react"
import {Token} from "../Token"
import { StakeForm } from "./StakeForm";
import { WalletBalance } from "./WalletBalance";

 interface WalletProps {
    supportedTokens: Array<Token>
 }
 
 export const Wallet = ({ supportedTokens }: WalletProps ) => {
   const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

   const handleTabChange = (event: ChangeEvent<{}>, newValue: string) => {
      setSelectedTokenIndex(parseInt(newValue))
   }

   return (<Box>
        <h1>My wallet</h1>
        <Box>
          <TabContext value={selectedTokenIndex.toString()}>
            <TabList aria-label="stake from tabs" onChange={handleTabChange}>
            {supportedTokens.map((token: Token, index) => {
               return (
                  <Tab label={token.name} value={index.toString()} key={index}></Tab>
               )
            })}
            </TabList>
            {supportedTokens.map((token: Token, index) => {
               return (
                  <TabPanel value={index.toString()} key={index}>
                     <div>
                        <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                        <StakeForm token={supportedTokens[selectedTokenIndex]}/>
                     </div>
                  </TabPanel>
               )
            })}
          </TabContext>          
        
        </Box>        
        </Box>
        )
 }