import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import FlagList from './components/flagList';
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
        <FlagList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
