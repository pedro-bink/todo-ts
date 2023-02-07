import './App.css';
import { TodoProvider } from './context/context';
import Rotas from './Rotas';
import { BrowserRouter, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <div className="bg-custom-bg">
          <Rotas />
        </div>
      </TodoProvider>
    </BrowserRouter>
  );
}

export default App;
