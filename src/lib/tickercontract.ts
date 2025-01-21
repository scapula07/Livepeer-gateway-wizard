declare const window: any;
import { ethers, BrowserProvider,ErrorCode ,ErrorDescription, EthersError} from "ethers";
import proxyABI from "../abi/tickerBrokerProxy.json";
import targetABI from "../abi/tickerBrokerTarget.json";
import { FundParams } from "./api/types";
import { toast } from "react-toastify";
// Proxy contract address
const proxyAddress = '0xa8bB618B1520E284046F3dFc448851A1Ff26e41B';

// Initialize provider and signer lazily (to avoid immediate execution)
let provider: BrowserProvider | null = null;
let signer: ethers.JsonRpcSigner | null = null;

// Initialize the provider and signer (called only when needed)
async function initializeProviderAndSigner() {
  if (!provider || !signer) {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }
}

// Get the proxy contract instance
async function getProxyContract() {
  await initializeProviderAndSigner();
  return new ethers.Contract(proxyAddress, proxyABI, signer!);
}

// Function to get the implementation contract address
export async function getTickerTargetAddress(): Promise<string> {
  const proxyContract = await getProxyContract();
  const implementationAddress = await proxyContract.controller();
  console.log('Implementation contract address:', implementationAddress);
  return implementationAddress;
}

// Function to get the implementation contract instance
export async function getTickerTargetContract() {
  const implementationAddress = await getTickerTargetAddress();
  console.log(implementationAddress,"address")
  return new ethers.Contract(proxyAddress, targetABI, signer!);
}

// Example function to fund a deposit in the implementation contract
export async function fundDepositAndReserve(totalInEther:string,deposit:string,reserve:string) {
      console.log(ethers.parseEther(totalInEther),"wei")
    try{
        const implementationContract = await getTickerTargetContract();
        const tx = await implementationContract.fundDepositAndReserve(ethers.parseEther(deposit),ethers.parseEther(reserve),{ value: ethers.parseEther(totalInEther)});
        await tx.wait();
        console.log('Deposit funded!',tx);
      }catch(e:any){
        console.log(e.reason)
        throw new Error(e.reason)
      }

}

export async function fundDepositAndReserveFor(totalInEther:string,deposit:string,reserve:string,address:string) {
  try{
      const implementationContract = await getTickerTargetContract();
      const tx = await implementationContract.fundDepositAndReserveFor(address,ethers.parseEther(deposit),ethers.parseEther(reserve),{ value: ethers.parseEther(totalInEther)});
      await tx.wait();
      console.log('Deposit funded!',tx);
    }catch(e:any){
      console.log(e.reason)
      throw new Error(e.reason)
    }

}

export async function withDraw() {
  try{
      const implementationContract = await getTickerTargetContract();
      const tx = await implementationContract.withdraw();
      await tx.wait();
      console.log('success',tx);
    }catch(e:any){
      console.log(e.reason)
      throw new Error(e.reason)
    }

}


export async function getSenderInfo(account:string):Promise<FundParams> {
   
      const implementationContract = await getTickerTargetContract();
      const info= await implementationContract.getSenderInfo(account)
      return {
          deposit:ethers.formatEther(info[0][0]),
          reserve:ethers.formatEther(info[1][0]),
        }
  }
