import { Button, Grid, TextField, useTheme } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const Login = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100vw',
        height: '100%'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 400,
            height: 'auto',
            pt: '2rem',
            pb: '2rem'
          }
        }}>
        <Paper elevation={6}>
          <form>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              p=".5rem"
              mb="2rem"
              color="white"
              bgcolor={[theme.palette.mode === 'light' ? blue[600] : 'inherit']}>
              Register
            </Typography>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={10}>
                <TextField fullWidth required label="Username" variant="standard"></TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="E-mail"
                  variant="standard"></TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  required
                  type="password"
                  label="Password"
                  variant="standard"></TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  required
                  type="password"
                  label="Re-password"
                  variant="standard"></TextField>
              </Grid>
              <Grid item xs={10} sx={{ mt: '1rem' }}>
                <Button fullWidth variant="contained">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
