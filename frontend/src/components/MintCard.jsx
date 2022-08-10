import {useState} from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import {create} from 'ipfs-http-client';
import information from '../information.json';
import NFTMint from '../artifacts/contracts/NFTMint.sol/NFTMint.json'

const NFTMintAddress = information.NFTMintAddress;
const client = create('https://ipfs.infura.io:5001/api/v0');
const MintCard = () => {
  const etherScanUrl = `https://rinkeby.etherscan.io/address/${NFTMintAddress}`;
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({name: '', description: ''});
  const [showContractAddress, setShowContractAddress] = useState(false);
  const onChange = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      console.log(added);
      console.log(added.path);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    }
    catch(error) {
      console.log(error);
    }
  }
  const mintNFT = async () => {
    const {name, description} = formInput;
    if(!name || !description|| !fileUrl) return;
    const data = JSON.stringify({
      name, description, image: fileUrl
    });
    console.log("mint");
    try {
      console.log("Try");
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTMintAddress, NFTMint.abi, signer);
      const tx = await contract.createToken(url);
      await tx.wait();
      setShowContractAddress(true);
      console.log(tx);
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div className='flex justify-center items-center z-10 absolute top-0 h-screen sm:w-full'>
        
      <div className='flex flex-col pb-12 '>
        <h1 className='text-3xl text-center'>NFT Minter</h1>
        <input type="text" name='name' placeholder='Enter NFT name' className='mt-8 border rounded p-5' onBlur={(e) => setFormInput({...formInput, name: e.target.value})} />
        <textarea type="text" name='description' placeholder='Enter NFT description' className='mt-4 border rounded p-5' onBlur={(e) => setFormInput({...formInput, description: e.target.value})} />
        <input type="file" className='my-4' onChange={(e) => onChange(e)} />
        <button className='font-bold mt-4 bg-indigo-500 text-white rounded p-5 shadow-lg' onClick={() => mintNFT()}>Mint</button>
        {
          showContractAddress && 
          <p><b>NFT is minted Successfully</b> <br /> Contract Address:  <a href={etherScanUrl} target="_blank">{NFTMintAddress}</a> </p>
        }
      </div>
      
    </div>
  );
}

export default MintCard;