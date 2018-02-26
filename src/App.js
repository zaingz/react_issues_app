import React, { Component } from 'react';
import { RepoTabSection } from './views/RepoTabSection';
import { RepoSelector } from './views/RepoSelector';
import './App.css';

import { connect } from 'react-redux';
import { fetchUserRepos, setUsername } from './actions/UserActions';
import { setRepoName, fetchIssues } from './actions/RepoActions';

function mapStateToProps({ user, repo }) {
  return {
    user: user.toJS(),
    repo: repo.toJS()
  };
}

class App extends Component {
  fetchUserRepos = () => {
    this.props.dispatch(fetchUserRepos());
  };

  setUsername = username => {
    this.props.dispatch(setUsername(username));
  };

  setRepoName = (username, repoName) => {
    this.props.dispatch(setRepoName(username, repoName));
  };

  getFilteredIssues = (username, repo, query) => {
    this.props.dispatch(fetchIssues(username, repo, query));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RepoSelector
            setRepoName={this.setRepoName}
            setUsername={this.setUsername}
            user={this.props.user}
            fetchUserRepos={this.fetchUserRepos}
          />
        </header>
        <div className="App-intro">
          <RepoTabSection
            getFilteredIssues={this.getFilteredIssues}
            repo={this.props.repo}
            username={this.props.user.username}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
