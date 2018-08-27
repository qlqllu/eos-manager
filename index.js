import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

document.addEventListener('scatterLoaded', scatterExtension => {

  // Scatter will now be available from the window scope.
  // At this stage your app's connection to the Scatter web extension is encrypted
  // and ready for use.
  const scatter = window.scatter;
  window.scatter = null;

  //if any of the fields does not match, or is null in scatter, getidentity will fail
  const requiredFields = {
    personal:['firstname', 'lastname', 'email', 'birthdate'],
    location:['phone', 'address', 'city', 'country', 'zipcode'],
    accounts:[
        {blockchain:'eos', host:'www.myeos.com', port:8888, chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'},
        // {blockchain:'eth', chainId:1}
    ]
  };

  scatter.getIdentity(requiredFields).then(identity => {
    console.log(identity)
  }).catch(error => {
    console.error(error);
  })

})
ReactDOM.render(<App />, document.getElementById('root'));
