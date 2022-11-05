import React from 'react';
import { Link } from 'react-router-dom';
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
    this.setState({
      username: result.name,
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
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
