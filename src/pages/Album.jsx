import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      details: '',
      trackList: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const result = await getMusics(id);
    const element = (
      <div>
        <h2 data-testid="album-name">
          Album:
          {' '}
          { result[0].collectionName }
        </h2>
        <h2 data-testid="artist-name">
          Artista:
          {' '}
          { result[0].artistName }
        </h2>
      </div>);
    this.setState({ details: element, trackList: result });
  }

  render() {
    const { details, trackList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { details }
        <div>
          {trackList.map((track) => (
            track.trackId ? (
              <div key={ track.trackId }>
                <MusicCard
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                />
              </div>)
              : ''
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
