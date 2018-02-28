import Immutable from 'immutable';
import * as ActionTypes from '../actions/ActionTypes';

const repoDefaultState = Immutable.fromJS({
  name: '',
  issues: [],
  commits: []
});

export default function(state = repoDefaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_REPO_NAME:
      return state.set('name', action.payload);

    case ActionTypes.FETCH_REPO_ISSUES:
      return state.set('issues', action.payload);

    case ActionTypes.RESET_REPO:
      return state
        .set('issues', [])
        .set('name', '')
        .set('commits', []);

    case ActionTypes.FETCH_REPO_COMMITS:
      return state.set('commits', [...state.get('commits'), ...action.payload]);
  }
  return state;
}
