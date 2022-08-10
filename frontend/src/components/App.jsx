import {useEffect} from 'react';
import MintCard from './MintCard';
import Styles from './App.module.css';


function App() {
  useEffect(() => {
    document.title = "NFT Minter";
  })
  return (
    <div className={Styles.App}>
      <p className='bg-black text-white text-center' >Note: Please Use Rinkeby Testnet </p>
      <MintCard className='border-black' />
    </div>
  );
}

export default App;
