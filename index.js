import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

document.addEventListener('scatterLoaded', scatterExtension => {

  // Scatter will now be available from the window scope.
  // At this stage your app's connection to the Scatter web extension is encrypted
  // and ready for use.
  const scatter = window.scatter;
  window.scatter = null;

  const requiredFields = {
    personal:['firstname', 'lastname', 'email', 'birthdate'],
    location:['phone', 'address', 'city', 'state', 'country', 'zipcode'],
    accounts:[
        {blockchain:'eos', host:'127.0.0.1', port:8888, chainId:'aca....'},
        {blockchain:'eth', chainId:1}
    ]
  };

  scatter.getIdentity(requiredFields).then(identity => {
    console.log(identity)
  }).catch(error => {
      //...
  })

})
ReactDOM.render(<App />, document.getElementById('root'));
