import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../style/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      artist: '',
      loading: false,
      albumList: '',
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

  onSearchButtonClick = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(artist);
    const element = (
      <div className="search-result">
        <div>
          Resultado de álbuns de:
          {' '}
          { artist }
        </div>
        {result.length < 1 ? 'Nenhum álbum foi encontrado'
          : (
            <ul>
              {result.map((card) => (
                <li key={ card.collectionId }>
                  <img
                    className="album-image"
                    src={ card.artworkUrl100 }
                    alt={ card.collectionName }
                  />
                  {' '}
                  { card.artistName }
                  {' '}
                  { card.collectionName }
                  {' '}
                  <Link
                    to={ `/album/${card.collectionId}` }
                    data-testid={ `link-to-album-${card.collectionId}` }
                  >
                    Vá para album

                  </Link>
                </li>))}
            </ul>)}
      </div>
    );
    this.setState({ artist: '', loading: false, albumList: element });
  };

  render() {
    const { artist, loading, albumList } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading />
          : (
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
                type="button"
                data-testid="search-artist-button"
                disabled={ this.isLoginButtonDisabled() }
                onClick={ this.onSearchButtonClick }
                className="search-button"
              >
                Pesquisar

              </button>
            </form>)}
        { albumList }
      </div>
    );
  }
}

export default Search;
