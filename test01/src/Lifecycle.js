import React,{Component} from 'react';

class Lifecycle extends Component {
    constructor(props){
        super(props);
        this.state = {};
        console.log('1. constructor Call');
    }
  render() {
    console.log('3. render Call');
    return(
        <h2>constructor function</h2>
    )
  }
}

export default Lifecycle;