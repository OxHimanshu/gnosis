import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import Swap from './pages/Swap';
import Pools from './pages/Pools';
import Navbar from './components/Navbar';

const moonbase = {
  id: 1287,
  name: 'Moonbase Alpha',
  network: 'moonbase',
  iconUrl: 'https://moonscan.io/images/svg/brands/mainbrand-1.svg?v=22.11.5.0',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Moonbase Alpha',
    symbol: 'DEV',
  },
  rpcUrls: {
    default: 'https://rpc.testnet.moonbeam.network',
  },
  blockExplorers: {
    default: { name: 'Moonbase', url: 'https://moonbase.moonscan.io' },
  },
  testnet: true,
};

const polygonZkevm = {
  id: 1442,
  name: 'Polygon ZKevm',
  network: 'polygonZkevm',
  iconUrl: 'https://testnet-zkevm.polygonscan.com/images/svg/brands/main.svg?v=23.5.4.0',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://rpc.public.zkevm-test.net',
  },
  blockExplorers: {
    default: { name: 'polygonZkevm', url: 'https://testnet-zkevm.polygonscan.com/' },
  },
  testnet: true,
};

const gnosisChiado = {
  id: 10200,
  name: 'Gnosis Chiado Testnet',
  network: 'Gnosis Chiado Testnet',
  iconUrl: 'https://gnosisscan.io/token/images/gnosans_32.png?v=23.6.2.0',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'XDAI',
    symbol: 'XDAI',
  },
  rpcUrls: {
    default: 'https://rpc.chiadochain.net',
  },
  blockExplorers: {
    default: { name: 'gnosis', url: 'https://blockscout.chiadochain.net' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [gnosisChiado, chain.polygonMumbai, moonbase, polygonZkevm],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="w-screen h-screen bg-[#121517]">
          <Router>
            <Navbar/>
            <Routes>
              <Route path='/' exact element={<Swap/>} />
              <Route path='/pools' element={<Pools/>} />
            </Routes>
          </Router>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
