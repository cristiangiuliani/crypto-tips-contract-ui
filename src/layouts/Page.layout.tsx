import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container, Grid,
} from '@mui/system';

import TipsCounter from '../components/TipsCounter.component';
import SendTipFormContainer from '../containers/SendTipForm.container';
import TipsListContainer from '../containers/TipsList.container';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const PageLayout = () => {
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
