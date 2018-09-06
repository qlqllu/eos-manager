import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import EOS from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.esm';

let chain = {
  main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
  jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
  local: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
}

let network = {blockchain:'eos', host:'www.myeos.com', port:8888, chainId: chain.local};

ScatterJS.scatter.connect('eos manager').then(connected => {

  // If the user does not have Scatter or it is Locked or Closed this will return false;
  if(!connected) return false;

  const scatter = ScatterJS.scatter;

  window.ScatterJS = null;

  // Now we need to get an identity from the user.
  // We're also going to require an account that is connected to the network we're using.
  const requiredFields = {
    // personal:['firstname', 'lastname', 'email', 'birthdate'],
    // location:['phone', 'address', 'city', 'country', 'zipcode'],
    accounts:[network]
  };

  scatter.getIdentity(requiredFields).then(identity => {
    console.log(identity)

    // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
    // the user for their account name beforehand. They could still give you a different account.
    window.account = identity.accounts.find(x => x.blockchain === 'eos');

    // You can pass in any additional options you want into the eosjs reference.
    const eosOptions = {
      // keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',// private key
      httpEndpoint: 'http://www.myeos.com:8888',
      chainId: chain.local,
      authorization:[`${account.name}@${account.authority}`]
    };

    // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
    const eos = scatter.eos(network, EOS, eosOptions);

    window.eos = eos;

    // const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
    // eos.contract(account.name).then(contract => {
    //   contract.hi('abc');
    // });

    // eos.getActions(account.name).then(actions => {
    //   console.log(actions);
    // });

    eos.getAbi(account.name).then(result => {
      console.log(result);
    });

    ReactDOM.render(<App />, document.getElementById('root'));
  }).catch(error => {
    console.error(error);
  });

});



