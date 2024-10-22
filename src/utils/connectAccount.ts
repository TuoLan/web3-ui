import { ethers, Eip1193Provider } from 'ethers';

export const connectAccount = async (address: string, abi: any[]) => {
  let web3Provider
  if (window.ethereum) {
    console.log(window.ethereum);

    web3Provider = window.ethereum
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      console.log(accounts[0]);
    })
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } catch {
      console.error('error')
    }
  }
  // 创建 Ethers.js 提供者
  const provider = new ethers.BrowserProvider(web3Provider as Eip1193Provider);

  // 创建 signer
  const signer = await provider.getSigner();

  // 创建合约实例
  const ethContract = new ethers.Contract(address, abi, signer);

  return Promise.resolve(ethContract)
}
