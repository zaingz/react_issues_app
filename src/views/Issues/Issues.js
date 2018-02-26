import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { Form, Input, Select } from 'antd';
import { IssueQueryBuilder } from '../../components/IssueQueryBuilder';
import './Issues.css';

const FormItem = Form.Item;

const InputGroup = Input.Group;
const Option = Select.Option;

class Issues extends Component {
  constructor(props) {
    super(props);
    const { repoName, username } = this.props;
    this.state = {
      repoName,
      username,
      query: ''
    };
  }

  componentWillReceiveProps({ repoName, username }) {
    this.setState({
      repoName,
      username
    });
  }

  onQueryCreated = query => {
    const { username, repoName } = this.props;
    this.props.getFilteredIssues(username, repoName, query);
    this.setState({ query });
  };

  render() {
    let title = 'Please select a repo';
    const { repoName, username, query } = this.state;
    if (query.length && repoName.length) {
      title = `Generated query: ${username}/${repoName}/issues?${query}`;
    } else if (username.length && repoName.length) {
      title = `Listing issues for ${username}/${repoName}`;
    }

    return username.length && repoName.length ? (
      <div className="Issues">
        <h3>{title}</h3>

        <div className="Issues-query">
          <IssueQueryBuilder onQueryCreated={this.onQueryCreated} />
        </div>

        <List
          className="Issues-list"
          itemLayout="horizontal"
          dataSource={this.props.issues}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avatar_url} />}
                title={<a href={item.html_url}>{item.title}</a>}
                description={`${item.body.substring(0, 160)} . . .`}
              />
            </List.Item>
          )}
        />
      </div>
    ) : (
      <h3>{title}</h3>
    );
  }
}

export default Issues;
