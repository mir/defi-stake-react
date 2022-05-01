import { Box, makeStyles, Tab } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { ChangeEvent, useState } from "react"
import {Token} from "../Token"
import { StakeForm } from "./StakeForm";
import { WalletBalance } from "./WalletBalance";

 interface WalletProps {
    supportedTokens: Array<Token>
 }
 
 const useStyles = makeStyles((theme) => ({
   tabContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(4) 
   },
   box: {
      backgroundColor: "white",
      borderRadius: "25px",       
   },
   header: {
      color: "white "
   }
}))

 export const Wallet = ({ supportedTokens }: WalletProps ) => {
   const classes = useStyles()
   const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

   const handleTabChange = (event: ChangeEvent<{}>, newValue: string) => {
      setSelectedTokenIndex(parseInt(newValue))
   }

   return (<Box>
        <h1 className={classes.header}>My wallet</h1>
        <Box className={classes.box}>
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
                     <div className={classes.tabContent}>
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