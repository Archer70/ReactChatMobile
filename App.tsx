import React, {ReactNode} from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Platform,
} from 'react-native';
import SocketIo from 'socket.io-client';

import GlobalContext from "./globals/GlobalContext";
import Header from "./components/Header";
import Loading from './pages/Loading';
import Chat from "./pages/Chat";
import Login from './pages/Login';
import StyleVars from './css/vars';

interface State {
    name: string;
    onlineUsers: number;
    userListOpen: boolean;
    loaded: boolean;
}

export default class App extends React.Component<{}, State> {
    private socketIo!: SocketIOClient.Socket;

    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            onlineUsers: 0,
            userListOpen: false,
            loaded: false,
        };
    }

    componentDidMount() {
        this.socketIo = SocketIo('http://192.168.0.4:3123');
        this.socketIo.on('connect', () => {
            this.setState({loaded: true});
        });
    }

    render(): ReactNode {
        const appState: ReactNode = (
            <View style={styles.loadedApp}>
                <Header appLoaded={this.state.loaded} />
                <View style={styles.contentArea}>
                    {this.getPage()}
                </View>
            </View>
        );

        return (
            <GlobalContext.Provider value={{socketIo: this.socketIo}}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {this.state.loaded ? appState : <Loading />}
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </GlobalContext.Provider>
        );
    }

    private setName = (name: string) => {
        this.setState({name});
    }

    private getPage(): ReactNode {
        let view: ReactNode;
        if (this.state.name === '') {
            view = <Login onLogin={this.setName} />;
        } else {
            view = <Chat name={this.state.name} />;
        }
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleVars.COLOR_DARK,
    },
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadedApp: {
        flex: 1,
    },
    contentArea: {
        flex: 1,
        backgroundColor: StyleVars.COLOR_LIGHT,
    },
});
