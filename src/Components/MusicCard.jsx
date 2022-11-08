import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favoritesList = await getFavoriteSongs();
    console.log(favoritesList);
    this.setState({ checked: favoritesList.some((track) => track.trackId === trackId) });
  }

  render() {
    const { loading, checked } = this.state;
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    return (
      <div>
        <h3>
          { trackName }
        </h3>
        <p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </p>
        { loading ? <Loading /> : <p> </p> }
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            defaultChecked={ checked }
            onChange={ async ({ target }) => {
              this.setState({ loading: true });
              if (target.checked) {
                await addSong(this.props);
                this.setState({ loading: false });
              } else {
                await removeSong(this.props)
                  .then(() => this.setState({ loading: false }));
              }
            } }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
