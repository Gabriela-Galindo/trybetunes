import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      artist: '',
    };
  }

  handleChange(event) {
    this.setState({ artist: event.target.value }, () => {
      this.isLoginButtonDisabled();
    });
  }

  isLoginButtonDisabled = () => {
    const { artist } = this.state;
    const min = 2;
    return artist.length < min;
  };

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <br />
          <label htmlFor="search-artist">
            <input
              id="search-artist"
              name="search-artist"
              type="text"
              value={ artist }
              onChange={ this.handleChange }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ this.isLoginButtonDisabled() }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
