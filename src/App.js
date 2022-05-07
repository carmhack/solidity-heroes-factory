import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import HeroesFactory from "./artifacts/contracts/HeroesFactory.sol/HeroesFactory.json";

function App() {
  const [name, setName] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState();

  const getHeroes = async () => {
    const data = await contract.getHeroes();
    console.log(data);
    setHeroes(data);
  }

  const createHero = async (_name) => {
    const transaction = await contract.createRandomHero(_name);
    await transaction.wait();
    getHeroes();
  }

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setAccount(accounts[0]);
      setContract(
        new ethers.Contract(
          "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          HeroesFactory.abi,
          signer
        )
      );
    } else {
      console.log("Please install MetaMask");
    }
  }

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <div>
      <section className="hero is-medium is-dark">
        <div className="hero-body">
          <p className="title">
            Heroes Factory
          </p>
          <p className="subtitle">
            Generate random hero on ethereum blockchain
          </p>
        </div>
      </section>

      <section className="section">
        <button className="button is-dark" onClick={getHeroes}>Load heroes</button>

        <div className="new-hero-section">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="New hero name"
              />
            </div>
          </div>
          <button
            className="button is-success"
            onClick={() => createHero(name)}
          >
            Create New Hero
          </button>
        </div>
        
        <h3 className="title is-3">Heroes List</h3>
        {
          heroes && heroes.map((hero, i) => {
            return (
              <div className="box" key={i}>
                {hero.name}<br/>
                Strength: {hero.strength.toNumber()}<br/>
                Intelligence: {hero.intelligence.toNumber()}<br/>
                Dexterity: {hero.dexterity.toNumber()}
              </div>
            )
          })
        }
      </section>
    </div>
  );
}

export default App;
