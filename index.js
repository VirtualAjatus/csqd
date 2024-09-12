// Funktio minttaushinnan hakemiseen
async function getMintPrice() {
  try {
    // Käytä Stacks.js -kirjastoa hakeaksesi sopimuksen arvon
    const response = await callReadOnlyFunction({
      contractAddress: 'SP2J6Y09JMFWWZCT4VJX0BA5W7A9HZP5EX96Y6VZY',
      contractName: 'earlycrows-bonding-curve',
      functionName: 'get-price',
      functionArgs: [],
      network: new StacksMainnet(),
      senderAddress: 'SP1234EXAMPLEADDRESS'
    });
    const mintPrice = response.value;
    document.getElementById('nft-price').textContent = mintPrice + ' STX';
  } catch (error) {
    console.error('Error fetching mint price:', error);
    document.getElementById('status').textContent = 'Error fetching mint price';
  }
}

// Funktio NFT:n minttaamiseen
async function mintNFT() {
  try {
    // Kutsu sopimusta
    document.getElementById('status').textContent = 'Minting...';

    const txOptions = {
      contractAddress: 'SP2J6Y09JMFWWZCT4VJX0BA5W7A9HZP5EX96Y6VZY',
      contractName: 'earlycrows-bonding-curve',
      functionName: 'mint-nft',
      functionArgs: [],
      senderKey: 'your-private-key',
      network: new StacksMainnet(),
      postConditionMode: PostConditionMode.Deny,
    };

    const transaction = await makeContractCall(txOptions);
    const result = await transaction;
    document.getElementById('status').textContent = 'Mint successful!';
  } catch (error) {
    console.error('Mint failed:', error);
    document.getElementById('status').textContent = 'Mint failed!';
  }
}

// Hae minttaushinta, kun sivu latautuu
window.onload = function () {
  getMintPrice();
};

// Lisää tapahtuma kuuntelija mint-napille
document.getElementById('mint-button').addEventListener('click', mintNFT);
