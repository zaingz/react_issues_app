import Immutable from 'immutable';
import * as ActionTypes from '../actions/ActionTypes';

const repoDefaultState = Immutable.fromJS({ name: '', issues: [] });

export default function(state = repoDefaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_REPO_NAME:
      return state.set('name', action.payload);

    case ActionTypes.FETCH_REPO_ISSUES:
      return state.set('issues', action.payload);

    case ActionTypes.RESET_REPO:
      return state.set('issues', []).set('name', '');
  }
  return state;
}
