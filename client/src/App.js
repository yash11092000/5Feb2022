import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, ret: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        [
          {
            "constant": false,
            "inputs": [
              {
                "name": "x",
                "type": "uint256"
              }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0x60fe47b1"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "get",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x6d4ce63c"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "_ProdName",
                "type": "string"
              },
              {
                "name": "_CreatedDate",
                "type": "string"
              }
            ],
            "name": "CreatedProd",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0xcac9be27"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "uint256"
              }
            ],
            "name": "GetProd",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x7d16a4c3"
          }
        ],
        // deployedNetwork && deployedNetwork.address,
        "0x0259F29A5f1C937FfB682658EF348FB8D91ed5b6"
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    // var currentdate = new Date();
    // var datetime = "Last Sync: " + currentdate.getDate() + "/"
    //   + (currentdate.getMonth() + 1) + "/"
    //   + currentdate.getFullYear() + " @ "
    //   + currentdate.getHours() + ":"
    //   + currentdate.getMinutes() + ":"
    //   + currentdate.getSeconds();
    // // Stores a given value, 5 by default.
    // const ProdName = document.getElementById("prodname").value;
    // await contract.methods.set(5).send({ from: accounts[0] });
    // await contract.methods.CreatedProd(ProdName, datetime).call({ from: accounts[0] }).then((result) => {
    //   console.log(result);
    //   this.setState({ ret: result });
    // });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
    // document.getElementById("prodname").value = null;
  };

  Create = async () => {

    const { accounts, contract } = this.state;
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    // Stores a given value, 5 by default.
    const ProdName = document.getElementById("prodname").value;
    const ProdId = document.getElementById("prodId").value;
    await contract.methods.set(5).send({ from: accounts[0] });
    await contract.methods.CreatedProd(ProdId, ProdName, datetime).call({ from: accounts[0] }).then((result) => {
      // console.log(result);
      this.setState({ ret: result });
    });
    document.getElementById("prodname").value = null;
  }

  runExample2 = async () => {
    const { accounts, contract } = this.state;
    // let ProdId = document.getElementById("prodId").value;
    // let ProdId = document.getElementById("prodId").value;
    // console.log(typeof ProdId);
    // ProdId = parseInt(ProdId);
    let ProdId = 111;
    const response = await contract.methods.GetProd(ProdId).call().then((result) => {
      console.log(result);
    });
    console.log(response);
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <div>
          <input type="text" id="prodId" placeholder="Enter ProdId"></input>
          <input type="text" id="prodname" placeholder="Enter ProdName"></input>
          <button type="submit" onClick={this.Create}>Submit</button>
          <div>The stored value is: {this.state.ret}</div>
        </div>
        <input type="text" id="prodId" placeholder="Enter Id" />
        <button type="submit" onClick={this.runExample2}>Submit</button>
        <div>The Stored Data Is : </div>
      </div>
    );
  }
}

export default App;
