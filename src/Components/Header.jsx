import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../style/Header.css';

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
        <div className="search-link">
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa

          </Link>
          <br />
        </div>
        <div className="favorite-link">
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Músicas Favoritas

          </Link>
          <br />
        </div>
        <div className="profile-link">
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil

          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
