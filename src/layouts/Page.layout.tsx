import {
  FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container, Grid,
} from '@mui/system';
import React, {
  useContext,
  useEffect,
} from 'react';

import TipsCounter from '../components/TipsCounter.component';
import { ANVIL_CONFIG, SEPOLIA_CONFIG } from '../config';
import SendTipFormContainer from '../containers/SendTipForm.container';
import TipsListContainer from '../containers/TipsList.container';
import { NetworksEnum } from '../globals.enum';
import GlobalsContext, { type TBlockchain } from '../providers/Globals.context';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const getBlockchainConfig = (network: string | null | undefined): TBlockchain | null => {
  switch (network) {
    case NetworksEnum.Anvil:
      return ANVIL_CONFIG;
    case NetworksEnum.Sepolia:
      return SEPOLIA_CONFIG;
    default:
      return null;
  }
};

const PageLayout = () => {
  const { network, updateGlobals = () => {} } = useContext(GlobalsContext);

  useEffect(() => {
    const networkBlockchainConfig: TBlockchain | null = getBlockchainConfig(network) || null;
    updateGlobals({ blockchainConfig: networkBlockchainConfig });
  }, [network]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateGlobals({ network: (event.target as HTMLInputElement).value });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{
        background: 'radial-gradient( #002088, black)',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        width: '100%',
        maxWidth: '100% !important',
        height: '100vh',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <Grid container spacing={2} justifyContent='center' alignItems='flex-start'>
          <Grid sx={{ maxWidth: '22rem' }}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Network: </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={network}
                onChange={handleChange}
              >
                <FormControlLabel value={NetworksEnum.Sepolia} control={<Radio />} label="Sepolia testnet" />
                <FormControlLabel value={NetworksEnum.Anvil} control={<Radio />} label="Anvil local" />
              </RadioGroup>
            </FormControl>
            <SendTipFormContainer />
          </Grid>
          <Grid size="auto" alignItems="flex-start">
            <TipsCounter />
            <TipsListContainer />
          </Grid>
        </Grid>

      </Container>
    </ThemeProvider>
  );
};

export default PageLayout;
