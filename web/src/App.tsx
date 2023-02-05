import './App.css';
import { TodoProvider } from './context/context';
import Home from './pages/Home';

function App() {
  const port = process.env.PORT || 5173;
  return (
    <TodoProvider>
      <div>
        <Home />
      </div>
    </TodoProvider>
  );
}

export default App;
