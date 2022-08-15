import styled, { ThemeProvider } from 'styled-components';
import { DefaultTheme } from './themes/defaultTheme';
import './App.css';
import './assets/css/style.css'
import { Button, Nav } from 'reactstrap';

const Container = styled.div`
  padding: 2rem;
  color: ${({theme}) => theme.paragraph};
  background: ${({theme}) => theme.background};
`

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container>
        <Nav className='sidebar' />
        <Button color="primary">Primary</Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
