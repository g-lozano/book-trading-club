
import { getUser, getClicks } from '../reducer';
import { Link } from 'react-router';

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Top from './top.jsx'

const Main = ({ click, reset, clicks, user }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Top/>
  </div>
);

Main.propTypes = {
  click: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired,
  clicks: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]).isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: getUser(state),
    clicks: getClicks(state),
  };
}

export const MainComponent = Main;
export const MainContainer = connect(mapStateToProps, actionCreators)(Main);
