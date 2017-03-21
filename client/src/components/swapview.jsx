import React from 'react';
import Book from './book.jsx';
import axios from 'axios';

class SwapView extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      allbooks: []
    }
  }
  getIncoming() {
    return (
      <div>
        incoming
      </div>
    )
  }
  getOutgoing() {
    return (
      <div>
        outgoing
      </div>
    )
  }
  getHistory() {
    return (
      <div>
        history
      </div>
    )
  }
  render() {
    var swapview = []
    
    switch(this.props.swapview) {
      case 'incoming':
        swapview = this.getIncoming(); break;
      case 'outgoing':
        swapview = this.getOutgoing(); break;
      case 'history':
        swapview = this.getHistory(); break;
      default:
        swapview = <div></div>; break;
    }
      
    return (
      <div>
        <div className="text-center view-title">My Swaps</div>
        <div> 
        <button onClick={this.props.setSwapViewIn} className="mdl-button mdl-js-button mdl-button--raised">Incoming Swap Requests</button>
        <button onClick={this.props.setSwapViewOut} className="mdl-button mdl-js-button mdl-button--raised">Outgoing Swap Requests</button>
        <button onClick={this.props.setSwapViewHistory} className="mdl-button mdl-js-button mdl-button--raised">Swap History</button>
        </div>
        <div>
          {swapview}
        </div>
      </div>
    )
  }
}

export default SwapView
