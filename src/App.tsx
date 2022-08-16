import styled, { ThemeProvider } from 'styled-components';
import { DefaultTheme } from './themes/defaultTheme';
import './App.css';
import './assets/css/style.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css';
import './assets/vendors/css/vendor.bundle.base.css';
import SideBar from './components/shared/Sidebar';

const Container = styled.div`
  padding: 2rem;
  color: ${({theme}) => theme.paragraph};
  background: ${({theme}) => theme.background};
`

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container>
        <SideBar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
