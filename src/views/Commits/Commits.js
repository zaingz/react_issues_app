import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { Input, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import './Commits.css';

const Search = Input.Search;

class Commits extends Component {
  constructor(props) {
    super(props);
    const { repoName, username } = this.props;
    this.state = {
      repoName,
      username,
      commits: this.props.commits,
      loading: false,
      hasMore: true
    };
  }

  componentWillReceiveProps({ repoName, username, commits }) {
    let loading = true,
      hasMore = true;
    if (this.props.commits.length < commits.length) loading = false;
    else if (this.props.commits.length === commits.length)
      loading = hasMore = false;
    this.setState({
      repoName,
      username,
      commits,
      loading
    });
  }

  getFilteredCommits = event => {
    const { value } = event.target;
    console.log(value);
    if (!value.length) {
      this.setState({ commits: this.props.commits });
    } else {
      const currentCommits = this.props.commits;
      const filteredCommits = currentCommits.filter(commit => {
        return commit.commit.message
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      this.setState({ commits: filteredCommits });
    }
  };

  loadMoreCommits = page => {
    const { repoName, username } = this.props;
    if (!this.state.loading) {
      this.setState({ loading: true });
      this.props.fetchNextCommits(username, repoName, page);
    }
  };

  render() {
    let title = 'Please select a repo';
    const { repoName, username, query } = this.state;
    if (username.length && repoName.length) {
      title = `Commits for ${username}/${repoName}`;
    }

    return username.length && repoName.length ? (
      <div className="Commits">
        <h3>{title}</h3>

        <div className="Commits-query">
          <Search
            size="large"
            placeholder="filter by commit messages"
            onKeyUp={this.getFilteredCommits}
          />
        </div>

        <div className="Infinite-Scroll">
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMoreCommits}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              className="Commits-list"
              itemLayout="horizontal"
              dataSource={this.state.commits}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.author ? item.author.avatar_url : ''} />
                    }
                    title={
                      <a href={item.html_url}>{item.commit.author.name}</a>
                    }
                    description={item.commit.message.substring(0, 160)}
                  />
                </List.Item>
              )}
            />
            {this.state.loading &&
              this.state.hasMore && <Spin className="demo-loading" />}
          </InfiniteScroll>
        </div>
      </div>
    ) : (
      <h3>{title}</h3>
    );
  }
}

export default Commits;
