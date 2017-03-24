import React from 'react';
import Book from './book.jsx';
import axios from 'axios';

class SwapView extends React.Component {
  constructor(props) {
    super(props)
  }
  getIncoming() {
    var books = []
    if (this.props.state.incoming.length) {
      this.props.state.incoming.forEach(
        (book, index) => {
          var id = index + '.' + book.id
          books.push(
            <div>
              <div className="relative book-div">
                <Book book={book}/>
              </div>
              User "{book.owner}" wants to swap!<br/>
              <button 
                name={id}
                onClick={this.props.handleAcceptIncoming}
                className="mdl-button mdl-js-button mdl-button--primary"
                ><i
                  name={id}
                  className="material-icons">swap_vertical_circle</i>
                <span name={id}>Accept</span>
              </button>
              <button 
                name={id}
                onClick={this.props.handleRejectIncoming}
                className="mdl-button mdl-js-button mdl-button--primary">
                <i
                  name={id}
                  className="material-icons">highlight_off</i>
                <span name={id}>Reject</span>
              </button>
            </div>
          )
        }
      )
    }
    else
      books = <div className="text-center"><br/><br/><br/>You have no incoming requests.</div>
    return (
      <div>
        {books}
      </div>
    )
  }
  getOutgoing() {
    var books = []
    if (this.props.state.outgoing.length) {
      this.props.state.outgoing.forEach(
        (book, index) => {
          books.push(
            <div>
            <div className="relative book-div">
              <Book book={book}/>
            </div>
            </div>
          )
        }
      )
    }
    else
      books = <div className="text-center"><br/><br/><br/>You have no outgoing requests.</div>
    return (
      <div>
        {books}
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
    
    switch(this.props.state.swapview) {
      case 'incoming':
        swapview = this.getIncoming(); break;
      case 'outgoing':
        swapview = this.getOutgoing(); break;
      case 'history':
        swapview = this.getHistory(); break;
      default:
        swapview = <div></div>; break;
    }
    console.lo
    return (
      <div>
        <div className="text-center view-title">My Swaps</div>
        <div className="text-center"> 
          <button 
            onClick={this.props.setSwapViewIn} 
            className={this.props.state.swapview == 'incoming'?active:normal}>
            Incoming Swap Requests</button>
          <button 
            onClick={this.props.setSwapViewOut} 
            className={this.props.state.swapview == 'outgoing'?active:normal}>
            Outgoing Swap Requests</button>
          <button 
            onClick={this.props.setSwapViewHistory} 
            className={this.props.state.swapview == 'history'?active:normal}>
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
