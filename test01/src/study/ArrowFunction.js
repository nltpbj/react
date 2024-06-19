import React, {Component} from "react";

class ArrowFunction extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
  render() {
    console.log('3. render Call');
    return(
        <h2>constructor function</h2>
    )
  }
}

export default ArrowFunction;