import Immutable from 'immutable';
import * as ActionTypes from '../actions/ActionTypes';

const userDefaultState = Immutable.fromJS({ repos: [], username: '' });

export default function(state = userDefaultState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_REPOS:
      const repos = action.payload.map(repo => repo.name);
      return state.set('repos', Immutable.fromJS(repos));

    case ActionTypes.SET_USER_NAME:
      return state.set('username', action.payload);
  }
  return state;
}
