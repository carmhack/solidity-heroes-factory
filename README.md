# Heroes Factory Full Stack dApp
Questa repository contiene un progetto di esempio **full stack** per una dApp chiamata Heroes Factory.
Il frontend è gestito con **React** ed **ethers.js**. Lo smart contract è scritto in **Solidity**. Le fasi di compilazione, testing e deploy sono gestite con **hardhat**.
N.B. lo scopo della repository è quello di offrire un esempio a chi vuole avvicinarsi allo sviluppo sul web3. Non ha un reale utilizzo.

### Smart contract
Il contratto, a partire da un nome, genera un eroe con delle statistiche casuali:
- forza (strength): da 1 a 20
- intelligenza (intelligence): da 1 a 20
- destrezza (dexterity): da 1 a 20

### Avviare il progetto
1. `npx hardhat node`
genera un server con un nodo eth in locale con 10 account di test (ognuno con 10.000 ether) e le chiavi private per importare un account su Metamask
1. Importare uno di questi account di test (sfruttando la chiave privata) su Metamask
1. `npx hardhat compile` per compilare lo smart contract
1. `npx hardhat run scripts/deploy.js --network localhost` 
per effettuare il deploy del contratto sul network locale (o su qualsiasi altro network che abbiamo scelto)
1. Il risultato sarà l’indirizzo del nostro smart contract
    Contract deployed to: indirizzo
    L’indirizzo generato va inserito in `App.js` nel metodo `initConnection`
1. `npm run start` per avviare il progetto React

### Step per riprodurre il progetto da zero
1. `npx create-react-app nome-app` per creare il progetto React
1. Entriamo nella cartella appena creata
1. `npx hardhat` per configurare il progetto (scegliere la prima opzione)
1. Installiamo le dipendenze
    `npm i ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers`
1. Configuriamo il file `hardhat.config.js` come segue
    ```
    module.exports = {
        solidity: "0.8.9",
        paths: {
            artifacts: "./src/artifacts",
        },
        networks: {
            hardhat: {
            chainId: 1337,
            },
        },
    };
    ```
    L’aggiunta di `paths` serve per il frontend, perché React non ha accesso al di fuori della cartella src. Il network `hardhat` invece è il network locale con l’id per usare Metamask.
1. Viene generato un json dentro src/artifacts/contracts/HeroesFactory.sol/ che contiene l’ABI dello smart contract
1. `npx hardhat node`
    genera un server con un nodo eth in locale con 10 account di test (ognuno con 10.000 ether) e le chiavi private per importare un account su Metamask
1. Importare uno di questi account di test (sfruttando la chiave privata) su Metamask
1. `npx hardhat compile` per compilare lo smart contract
1. `npx hardhat run scripts/deploy.js --network localhost` 
per effettuare il deploy del contratto sul network locale (o su qualsiasi altro network che abbiamo scelto)
1. Il risultato sarà l’indirizzo del nostro smart contract
    Contract deployed to: indirizzo
    L’indirizzo generato va inserito in `App.js` nel metodo `initConnection`
1. `npm run start` per avviare il progetto React
