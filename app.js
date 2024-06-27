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
    provider = new ethers.providers.Web3Provider(await web3Modal.connect());
    signer = provider.getSigner();
    const account = await signer.getAddress();
    accountInfo.innerText = `Connected account: ${account}`;
  } catch (error) {
    console.error("Connection failed:", error);
    accountInfo.innerText = 'Connection failed. Please try again.';
  }
}

connectButton.addEventListener('click', connectWallet);
