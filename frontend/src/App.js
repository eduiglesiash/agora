import './App.css';
import Book from './components/Book/Book.js'
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <main>
      <h1>Agora | Tu app de gestión de bibliotecas</h1>
      <ul>
        <li>Listado de libros en la biblioteca</li>
        <li>Vista detalle de un libro</li>
      </ul>

      <Dashboard/>
    </main>
  );
}

export default App;
