import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import ecc from 'eosjs-ecc'

class Account extends Component {
  accoutNameRef;
  createAccountNameRef;
  constructor(props){
    super(props);
    this.getAccountInfo = this.getAccountInfo.bind(this);
    this.createAccount = this.createAccount.bind(this);

    this.state = {
      account: null,
      createResult: null
    };
  }

  getAccountInfo(){
    window.eos.getAccount(this.accoutNameRef.value).then(accountInfo => {
      this.setState({account: accountInfo});
    }, err => {
      this.setState({account: {error: err.message}});
    });
  }

  createAccount(){
    let accoutName = this.createAccountNameRef.value;

    ecc.randomKey().then(privateKey => {

      eos.transaction(tr => {
        tr.newaccount({
          creator: window.account.name,
          name: accoutName,
          owner: ecc.privateToPublic(privateKey),
          active: ecc.privateToPublic(privateKey)
        })
      
        // tr.buyrambytes({
        //   payer: 'eosio',
        //   receiver: accoutName,
        //   bytes: 8192
        // })
      
        // tr.delegatebw({
        //   from: 'eosio',
        //   receiver: accoutName,
        //   stake_net_quantity: '10.0000 SYS',
        //   stake_cpu_quantity: '10.0000 SYS',
        //   transfer: 0
        // })
      })
    });
  }

  render() {
    return <div>
      <input ref={dom => this.accoutNameRef = dom} placeholder="Input account name"/>
      <button onClick={this.getAccountInfo}>Get account info</button>
      <div>
        <h2>Account Info:</h2>
        {this.state.account? <ReactJson src={this.state.account}/>: 'No account.'}
      </div>

      <hr/>

      <input ref={dom => this.createAccountNameRef = dom} placeholder="Input account name"/>
      <button onClick={this.createAccount}>Create account</button>
      <div>
        <h2>Create result:</h2>
        {this.state.createResult? <ReactJson src={this.state.createResult}/>: 'No account.'}
      </div>

    </div>;
  }
}

export default Account;
