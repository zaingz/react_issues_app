import React, { Component } from 'react';
import './RepoSelector.css';

import { Input, Select } from 'antd';
const Option = Select.Option;
const InputGroup = Input.Group;

class RepoSelector extends Component {
  state = {
    repos: [],
    repoSelection: ''
  };

  fetchUserRepos = event => {
    this.props.setUsername(event.target.value);
    this.setState({ repoSelection: '' });
  };

  onRepoOptionChanged = value => {
    this.setState({ repoSelection: value });
    this.props.setRepoName(this.props.user.username, value);
  };

  componentWillReceiveProps({ user }) {
    this.setState({
      repos: user.repos.map(repo => {
        return (
          <Option key={repo} value={repo}>
            {repo}
          </Option>
        );
      })
    });
  }
  render() {
    return (
      <div className="Repo-selector">
        <h2>Enter username to begin with</h2>

        <InputGroup compact>
          <Input
            size="large"
            style={{ width: '20%' }}
            placeholder="Username"
            onKeyUp={this.fetchUserRepos}
          />
          <Select
            placeholder="Repository"
            value={this.state.repoSelection}
            style={{ width: '20%' }}
            filterOption
            showSearch
            size="large"
            onChange={this.onRepoOptionChanged}
          >
            {this.state.repos}
          </Select>
        </InputGroup>
      </div>
    );
  }
}

export default RepoSelector;
