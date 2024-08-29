import './App.css';
import AppRouter from './components/AppRouter';
import { ThemeProvider } from './config/ThemeProvider';
import "./themes/darktheme.css";
import "./themes/lighttheme.css";
import "./themes/bluetheme.css";
import "./themes/orangetheme.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <AppRouter />
      </div>
    </ThemeProvider>
  );
}

export default App;
