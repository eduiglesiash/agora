import './App.css';
import { config } from './config/config';
import { Route } from 'wouter'
import DashboardPage from './pages/Dashboard/Dashboard.page'
import UsersPage from './pages/Users/Users.page'
import BooksPage from './pages/Books/Books.page'
import Menu from './components/Menu/Menu'
import TopBar from './components/TopBar/TopBar'

function App() {
  return (
    <>
      <TopBar />
      <Menu />
      <main className="Main">
        <Route path={config.paths.dashboard} component={DashboardPage} />
        <Route path={config.paths.users} component={UsersPage} />
        <Route path={config.paths.books} component={BooksPage} /> 
      </main>
    </>
  );
}
export default App;
