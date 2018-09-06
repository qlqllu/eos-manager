import React, { Component } from 'react';
import ReactJson from 'react-json-view';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      chainInfo: null
    };
  }

  componentDidMount(){
    window.eos.getInfo({}).then(info => this.setState({chainInfo: info}));
  }
  render(){
    return <div>
      {this.state.chainInfo? 
        <div>
          <h2>Chain Info:</h2>
          <ReactJson src={this.state.chainInfo} />
        </div>
        : 'waiting...'}
    </div>;
  }
}
export default Home;
