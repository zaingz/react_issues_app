import * as ActionTypes from './ActionTypes';
import axios from 'axios';

const baseurl = 'https://api.github.com';

export const fetchUserRepos = username => {
  return dispatch => {
    axios
      .get(`${baseurl}/users/${username}/repos`)
      .then(response =>
        dispatch({
          type: ActionTypes.FETCH_USER_REPOS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: ActionTypes.FETCH_USER_REPOS,
          payload: []
        })
      );
  };
};

export const setUsername = username => {
  return dispatch => {
    dispatch({
      type: ActionTypes.SET_USER_NAME,
      payload: username
    });
    if (!username.length)
      dispatch({
        type: ActionTypes.RESET_REPO
      });
    dispatch(fetchUserRepos(username));
  };
};
