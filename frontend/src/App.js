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
        <h1 className="App__title">Agora | Tu app de gestión de bibliotecas</h1>
        <Dashboard />
      </main></>
  );
}

export default App;
