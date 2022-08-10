import {useEffect} from 'react';
import MintCard from './MintCard';
import Styles from './App.module.css';


function App() {
  useEffect(() => {
    document.title = "NFT Minter";
  })
  return (
    <div className={Styles.App}>
      <MintCard className='border-black' />
    </div>
  );
}

export default App;
