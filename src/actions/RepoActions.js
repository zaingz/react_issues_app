import * as ActionTypes from './ActionTypes';
import axios from 'axios';

const baseurl = 'https://api.github.com';

export const fetchIssues = (username, repoName, query) => {
  return dispatch => {
    axios
      .get(`${baseurl}/repos/${username}/${repoName}/issues?${query}`)
      .then(response =>
        dispatch({
          type: ActionTypes.FETCH_REPO_ISSUES,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: ActionTypes.FETCH_REPO_ISSUES,
          payload: []
        })
      );
  };
};

export const fetchCommits = (username, repoName, page = 1) => {
  return dispatch => {
    axios
      .get(`${baseurl}/repos/${username}/${repoName}/commits?page=${page}`)
      .then(response =>
        dispatch({
          type: ActionTypes.FETCH_REPO_COMMITS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: ActionTypes.FETCH_REPO_COMMITS,
          payload: []
        })
      );
  };
};

export const setRepoName = (username, repoName) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.SET_REPO_NAME,
      payload: repoName
    });
    dispatch(fetchIssues(username, repoName));
    dispatch(fetchCommits(username, repoName));
  };
};
