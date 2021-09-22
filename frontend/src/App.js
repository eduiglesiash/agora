import './App.css';
import DashboardPage from './pages/Dashboard/Dashboard.page';
import Menu from './components/Menu/Menu'
import TopBar from './components/TopBar/TopBar';

function App() {
  return (
    <>
      <Menu />
      <TopBar/>
      <main className="Main">
        <DashboardPage />
      </main></>
  );
}

export default App;
