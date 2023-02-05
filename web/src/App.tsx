import './App.css';
import { TodoProvider } from './context/context';
import Home from './pages/Home';

function App() {
  return (
    <TodoProvider>
      <div>
        <Home />
      </div>
    </TodoProvider>
  );
}

export default App;
