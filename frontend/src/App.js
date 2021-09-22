import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Menu from './components/Menu/Menu'

function App() {
  return (
    <>
      <Menu />
      <main className="Main">
        <h1 className="App__title">Agora | Tu app de gestión de bibliotecas</h1>
        <Dashboard />
      </main></>
  );
}

export default App;
