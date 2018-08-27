import React, { Component } from 'react';
import EOS from 'eosjs';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      chainInfo: null
    };
  }

  componentDidMount(){
    let chain = {
      main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
      jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
      local: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
    }
  
    let eos = EOS({
      //keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',// private key
      httpEndpoint: 'http://www.myeos.com:8888',
      chainId: chain.local,
    });
    
    eos.getInfo({}).then(info => this.setState({chainInfo: info}));
  }
  render(){
    return <div>
      {this.state.chainInfo? JSON.stringify(this.state.chainInfo, null, 2): 'waiting...'}
    </div>;
  }
}
export default Home;
