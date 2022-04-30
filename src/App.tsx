import React from 'react';
import { ChainId, DAppProvider, Rinkeby } from '@usedapp/core';
import { Header } from './components/Header';
import { Container } from '@material-ui/core'
import { Main } from './components/Main';
import { getDefaultProvider } from 'ethers'

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Rinkeby],
      notifications: {
        expirationPeriod: 1000, //ms
        checkInterval: 1000, //ms
      },
      readOnlyChainId: Rinkeby.chainId,     
      readOnlyUrls: {
        [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
      },
    }}>
      <Header />
      <Container maxWidth="md">
        <div>Hi</div>
        <Main></Main>
      </Container>
    </DAppProvider>
  );
}

export default App;
