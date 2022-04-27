import React from 'react';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Header } from './components/Header';
import { Container } from '@material-ui/core'
import { Main } from './components/Main';

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Rinkeby, ChainId.Kovan]
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
