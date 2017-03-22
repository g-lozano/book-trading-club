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
    var active = "mdl-button mdl-js-button mdl-button--raised options-active"
    var normal = "mdl-button mdl-js-button mdl-button--raised"
    
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
        <div className="text-center"> 
          <button 
            onClick={this.props.setSwapViewIn} 
            className={this.props.swapview == 'incoming'?active:normal}>
            Incoming Swap Requests</button>
          <button 
            onClick={this.props.setSwapViewOut} 
            className={this.props.swapview == 'outgoing'?active:normal}>
            Outgoing Swap Requests</button>
          <button 
            onClick={this.props.setSwapViewHistory} 
            className={this.props.swapview == 'history'?active:normal}>
            Swap History</button>
        </div>
        <div>
          {swapview}
        </div>
      </div>
    )
  }
}

export default SwapView
