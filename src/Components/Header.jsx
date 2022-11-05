import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const result = await getUser();
    const resultString = JSON.stringify(result);
    this.setState({
      username: resultString,
      loading: false,
    });
  }

  render() {
    const { username, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          { username }
        </h1>
      </header>
    );
  }
}

export default Header;
