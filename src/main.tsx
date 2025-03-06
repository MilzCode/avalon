import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import './styles/tailwind.css';
//@ts-ignore
import routes from '~react-pages';

function App() {
  const element = useRoutes(routes);
  return <>{element}</>;
}

const container = document.getElementById('root') as HTMLElement;
//@ts-ignore
if (!container._reactRootContainer) {
  // Crea la raíz solo si no existe una previamente
  const root = ReactDOM.createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  console.warn("La raíz ya ha sido creada.");
}