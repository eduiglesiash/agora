import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { config } from './config/config';
import { Route, Switch } from 'wouter'
import DashboardPage from './pages/Dashboard/Dashboard.page'
import UsersPage from './pages/Users/Users.page'
import BooksPage from './pages/Books/Books.page'
import Menu from './components/Menu/Menu'
import TopBar from './components/TopBar/TopBar'
import UserDetailPage from './pages/UserDetail/UserDetail.page';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/Login/Login.page';
import PrivateRoute from './pages/PrivateRoute';

function App() {

  let login = true;

  return (
    <>
      {login && <TopBar />}
      {login && <Menu />}

      <main className="Main">
        <ToastContainer autoClose={5000} theme={'colored'} />
        <Switch>

          <Route path={config.paths.login} component={LoginPage} />
          <PrivateRoute path={config.paths.root} component={DashboardPage} />
          {/* <Route path={config.paths.dashboard} component={DashboardPage} /> */}
          <PrivateRoute path={config.paths.users} component={UsersPage} />
          <PrivateRoute path={config.paths.books} component={BooksPage} />
          <PrivateRoute path={config.paths.userDetail + '/:id'} component={UserDetailPage} />
        </Switch>
      </main>

    </>
  );
}
export default App;
