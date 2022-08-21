import styled, { ThemeProvider } from 'styled-components';
import { DefaultTheme } from './themes/defaultTheme';
import './App.css';
import './assets/css/style.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css';
import './assets/vendors/css/vendor.bundle.base.css';
import SideBar, { FlagPath } from './components/shared/SideBar';
import NavBar from './components/shared/NavBar';
import FlagPage from './components/pages/flags/FlagPage';
import MainPanel from './components/shared/MainPanel';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Container = styled.div`
  /* padding: 2rem; */
  color: ${({theme}) => theme.paragraph};
  background: ${({theme}) => theme.background};
`

function App() {
  const flagPageElement = <MainPanel title='Flags' page={<FlagPage />} />

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container className='container-fluid page-body-wrapper pt-0 proBanner-padding-top fixed-top'>
        <BrowserRouter>
        <NavBar />
        <SideBar />
          <Routes>
            <Route path={FlagPath} element={flagPageElement} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
