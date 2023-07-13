import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <AppRoutes />
  </RecoilRoot>
);