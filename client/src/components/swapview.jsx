import React from 'react';
import Book from './book.jsx';

class SwapView extends React.Component {
  constructor(props) {
    super(props)
    this.setSwapIn = this.setSwapIn.bind(this)
    this.setSwapOut = this.setSwapOut.bind(this)
    this.setSwapHistory = this.setSwapHistory.bind(this)
    this.getIncoming = this.getIncoming.bind(this)
    this.getOutgoing = this.getOutgoing.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.state = {
      swapview: ''
    }
  }
  setSwapIn() {
    this.setState({
      swapview: 'incoming'
    })
  }
  setSwapOut() {
    this.setState({
      swapview: 'outgoing'
    })
  }
  setSwapHistory() {
    this.setState({
      swapview: 'history'
    })
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
    
    switch(this.state.swapview) {
      case 'incoming':
        swapview = this.getIncoming(); break;
      case 'outgoing':
        swapview = this.getOutgoing(); break;
      case 'history':
        swapview = this.getHistory(); break;
      default:
        swapview = <div>hi</div>; break;
    }
      
    return (
      <div>
        <div className="text-center view-title">My Swaps</div>
        <button onClick={this.setSwapIn} className="mdl-button mdl-js-button mdl-button--raised">Incoming Swap Requests</button>
        <button onClick={this.setSwapOut} className="mdl-button mdl-js-button mdl-button--raised">Outgoing Swap Requests</button>
        <button onClick={this.setSwapHistory} className="mdl-button mdl-js-button mdl-button--raised">Swap History</button>
        <div>
          {swapview}
        </div>
      </div>
    )
  }
}

export default SwapView
