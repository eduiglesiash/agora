import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Menu from './components/Menu/Menu'
import TopBar from './components/TopBar/TopBar';

function App() {
  return (
    <>
      <Menu />
      <TopBar/>
      <main className="Main">
        <Dashboard />
      </main></>
  );
}

export default App;
