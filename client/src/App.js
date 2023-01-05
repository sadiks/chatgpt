import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ChatGpt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Search() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    prompt: '',
    data: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await axios.post('http://localhost:5000/chat', { prompt });
    console.log(res.data);
    setResponse({
      prompt: prompt,
      data: res.data
    });
    setLoading(false);
    setPrompt('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            ChatGpt
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="sValue"
              label="Ask your question?"
              name="sValue"
              autoComplete="sValue"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Grid item>
        {loading ?  <HourglassBottomRoundedIcon />:
          <>
          <Typography variant='h6' style={{ paddingTop: 10, textAlign: 'center' }}>{response.prompt}</Typography>
          <Typography variant='subtitle2' style={{ whiteSpace: 'pre-wrap' }}>{response.data}</Typography>
          </>
          }
        </Grid>
        
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}