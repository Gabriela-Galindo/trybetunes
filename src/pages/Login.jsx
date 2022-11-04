import React from 'react';
import Props from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: '',
      loading: false,
    };
  }

  handleChange(event) {
    this.setState({ username: event.target.value }, () => {
      this.isLoginButtonDisabled();
    });
  }

  isLoginButtonDisabled = () => {
    const { username } = this.state;
    const min = 3;
    return username.length < min;
  };

  onLoginButtonClick = async () => {
    const { username } = this.state;
    this.setState({ loading: true });
    await createUser({ name: username });
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { username, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form>
          Login
          <br />
          <label htmlFor="name">
            Insira seu nome
            <input
              id="name"
              name="name"
              type="text"
              value={ username }
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ this.isLoginButtonDisabled() }
            onClick={ this.onLoginButtonClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: Props.shape({
    push: Props.func,
  }),
}.isRequired;

export default Login;
