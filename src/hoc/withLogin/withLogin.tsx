import React, { Component, ComponentType } from 'react';
import axios from '../../utils/axios';

import toast from '../../utils/toast/toast';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import DefaultLoader from '../../components/UI/DefaultLoader/DefaultLoader';
import Container from '../../components/UI/Container/Container';
import styles from './withLogin.module.css';

const withLogin = <P extends object>(
  WrappedComponent: ComponentType<P>,
  authorizedRoles: string[]
) =>
  class WithLogin extends Component {
    state = {
      loggedIn: false,
      userVal: null,
      submitted: false,
      fieldVal: '',
    };

    logIn = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const value = this.state.fieldVal;
      this.setState({ fieldVal: '', submitted: true });
      axios
        .post('/api/auth/login', {
          password: value,
          authorizedRoles: authorizedRoles,
        })
        .then(res => {
          this.setState({ loggedIn: true });
        })
        .catch(err => this.setState({ submitted: false }));
    };

    render = () => {
      const logIn = (
        <div className={styles.FormContainer}>
          <h2>Login</h2>
          <form onSubmit={this.logIn} className={styles.Form}>
            <Input
              value={this.state.fieldVal}
              onChange={event =>
                this.setState({ fieldVal: event.target.value })
              }
            />
            <Button>Logg inn</Button>
          </form>
        </div>
      );

      return this.state.submitted ? (
        this.state.loggedIn ? (
          <WrappedComponent {...this.props as P} socket={this.socket} />
        ) : (
          <DefaultLoader />
        )
      ) : (
        logIn
      );
    };
    socket!: SocketIOClient.Socket;
  };

interface IAuthUser {
  name: string;
  role: string;
  token: string;
}

export default withLogin;
