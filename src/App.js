import './App.css';
import AppRouter from './components/AppRouter';
import { ThemeProvider } from './config/ThemeProvider';
import "./themes/darktheme.css";
import "./themes/lighttheme.css";
import "./themes/bluetheme.css";
import "./themes/orangetheme.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider>
        <div className="App">
          <AppRouter />
        </div>
      
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
