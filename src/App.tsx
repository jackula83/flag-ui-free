import styled, { ThemeProvider } from 'styled-components';
import './App.scss';
import { DefaultTheme } from './themes/defaultTheme';

const Container = styled.div`
  padding: 2rem;
  color: ${({theme}) => theme.paragraph};
  background: ${({theme}) => theme.background};
`

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
