import AppLayout from './componets/layout/AppLayuot';
import { CryptoContextProvider } from './context/cryptoContext';

export default function App() {  
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}
