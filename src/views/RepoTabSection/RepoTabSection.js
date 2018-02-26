import React, { Component } from 'react';
import { Issues } from '../Issues';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class RepoSelector extends Component {
  state = {
    key: '1'
  };

  onTabChanged = key => {
    this.setState({ key });
  };
  render() {
    let content = 'to be implemented ...';
    switch (this.state.key) {
      case '1':
        content = (
          <Issues
            getFilteredIssues={this.props.getFilteredIssues}
            issues={this.props.repo.issues}
            repoName={this.props.repo.name}
            username={this.props.username}
          />
        );
        break;
    }

    return (
      <div className="Repo-tab-section">
        <Tabs defaultActiveKey="1" onChange={this.onTabChanged}>
          <TabPane tab="Issues" key="1">
            {content}
          </TabPane>
          <TabPane tab="Pull Requests" key="2">
            {content}
          </TabPane>
          <TabPane tab="Reactions" key="3">
            {content}
          </TabPane>
        </Tabs>
      </div>
    );
  }

  getIssuesContent() {}
}

export default RepoSelector;
