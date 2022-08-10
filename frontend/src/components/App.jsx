import {useEffect} from 'react';
import MintCard from './MintCard';
import Styles from './App.module.css';


function App() {
  useEffect(() => {
    document.title = "NFT Minter";
  })
  return (
    <div className='flex justify-center items-center'>
      <p className='bg-black text-white text-center block z-100 p-0' >Note: Please Use Rinkeby Testnet </p>
      <MintCard className='border-black' />
    </div>
  );
}

export default App;
