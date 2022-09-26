import styled, { ThemeProvider } from 'styled-components';
import { DefaultTheme } from './themes/defaultTheme';
import './App.css';
import './assets/css/style.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css';
import './assets/vendors/css/vendor.bundle.base.css';
import FlagProvider from './providers/FlagProvider';
import SideBar from './components/shared/SideBar';
import FlagList from './components/pages/flags/FlagPage';
import MainPanel from './components/shared/MainPanel';
import NavBar from './components/shared/NavBar';
import FlagEdit from './components/pages/flags/FlagEdit';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { FlagEditRoute, FlagListRoute } from './routes';

const Container = styled.div`
  /* padding: 2rem; */
  color: ${({theme}) => theme.paragraph};
  background: ${({theme}) => theme.background};
`

function App() {
  const flagListElement = (
    <MainPanel title='Flags'>
      <FlagProvider>
        <FlagList />
      </FlagProvider>
    </MainPanel>);

  const flagEditElement = (
    <MainPanel title='Flags'>
      <FlagProvider>
        <FlagEdit />
      </FlagProvider>
    </MainPanel>
  )

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container className='container-fluid page-body-wrapper pt-0 proBanner-padding-top fixed-top'>
        <BrowserRouter>
          <NavBar />
          <SideBar />
          <Routes>
            <Route path={FlagListRoute} element={flagListElement} />
            <Route path={`${FlagEditRoute}/:flagUuid`} element={flagEditElement} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
