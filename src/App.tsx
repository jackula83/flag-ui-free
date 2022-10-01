import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'assets/css/style.css'
import 'assets/vendors/mdi/css/materialdesignicons.min.css';
import 'assets/vendors/css/vendor.bundle.base.css';
import { FlagProvider } from 'features/flags/FlagProvider';
import SideBar from 'ui/shared/Sidebar';
import MainPanel from 'ui/shared/MainPanel';
import NavBar from 'ui/shared/NavBar';
import { DefaultTheme } from 'ui/themes/defaultTheme';
import FlagList from 'pages/flags/FlagPage';
import FlagEdit from 'pages/flags/FlagEdit';
import { FlagEditRoute, FlagListRoute } from 'pages/routes';

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
      <Container className='container-scroller'>
        <BrowserRouter>
          <NavBar />
          <Container className='container-fluid page-body-wrapper my-1'>
            <SideBar />
            <Routes>
              <Route path={FlagListRoute} element={flagListElement} />
              <Route path={`${FlagEditRoute}/:flagUuid`} element={flagEditElement} />
            </Routes>
          </Container>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
