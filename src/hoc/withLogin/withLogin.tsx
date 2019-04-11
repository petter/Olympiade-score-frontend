import React, { Component, ComponentType } from 'react';
import io from '../../utils/socket/socket';
import toast from '../../utils/toast/toast';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import DefaultLoader from '../../components/UI/DefaultLoader/DefaultLoader';


const withLogin = <P extends object>(WrappedComponent: ComponentType<P>, socketPath = '/') =>
    class WithLogin extends Component {

        state = {
            loggedIn: false,
            userVal: null,
            submitted: false,
            fieldVal: ''
        }

        componentDidMount = () => {
            this.socket = io(socketPath);

            this.socket.on('disconnect', () => {
                this.setState({ loggedIn: false, submitted: false });
            });
        }

        logIn = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const value = this.state.fieldVal;
            this.setState({ fieldVal: '', submitted: true });
            this.socket.emit('authorize', this.state.fieldVal, (userVal: IAuthUser) => {
                if (userVal != null) {
                    console.log(userVal)
                    this.setState({ userVal: userVal, loggedIn: true });
                    toast.success('Hei, ' + userVal.name + '!');
                } else {
                    this.setState({ submitted: false });
                    toast.success('Incorrect login');
                }
            });
        }

        render = () => {

            const logIn = (
                <form onSubmit={this.logIn}>
                    <Input value={this.state.fieldVal} onChange={(event) => this.setState({ fieldVal: event.target.value })} />
                    <Button>Logg inn</Button>
                </form>
            );

            return this.state.submitted ? (this.state.loggedIn ? (<WrappedComponent {...this.props as P} socket={this.socket} />) : <DefaultLoader />) : logIn;
        }
        socket!: SocketIOClient.Socket;
    }

interface IAuthUser {
    name: string;
    role: string;
    token: string;
}

export default withLogin;