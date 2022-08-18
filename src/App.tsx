import styled, { ThemeProvider } from 'styled-components';
import { DefaultTheme } from './themes/defaultTheme';
import './App.css';
import './assets/css/style.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css';
import './assets/vendors/css/vendor.bundle.base.css';
import SideBar from './components/shared/SideBar';
import NavBar from './components/shared/NavBar';
import FlagPage from './components/shared/pages/FlagPage';

const Container = styled.div`
  /* padding: 2rem; */
  color: ${({theme}) => theme.paragraph};
  background: ${({theme}) => theme.background};
`

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container className='container-fluid page-body-wrapper pt-0 proBanner-padding-top fixed-top'>
        <NavBar />
        <SideBar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <FlagPage />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
