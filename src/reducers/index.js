import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import RepoReducer from './RepoReducer';

const allReducers = combineReducers({
  user: UserReducer,
  repo: RepoReducer
});

export default allReducers;
