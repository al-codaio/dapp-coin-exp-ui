import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPeopleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
var address = '0x0fd09a5de3ab10171d44f0163f201e12ae79c9d7';
var contract = new web3.eth.Contract(abi, address);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fistNames: [],
      lastNames: [],
      ages:      []
    }
  }

  componentWillMount() {
    contract.methods.getPeople().call()
      .then((instance) => this.setState({
        firstNames:  instance[0],
        lastNames:   instance[1],
        ages:        instance[2]
      })
    );

  };
  
  render() {
    
    var rows = [];

    _.each(this.state.firstNames, (value, index) => {
      row.push(
        <tr>
          <td>{web3.utils.hexToAscii(this.state.firstNames[index])}</td>
          <td>{web3.utils.hexToAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
        )
    })

    return (
      <div className="App">
        <div className="App-header"></div>
        <div className="App-content">
          <table>
            <thead>
              <tr>
                <th>First Names</th>
                <th>Last Names</th>
                <th>Ages</th>
              </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
