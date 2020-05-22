import React from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import StyleVars from '../css/vars'
import GlobalContext from "../globals/GlobalContext";

interface Props {
    onLogin: (name: string) => void;
}

interface State {
    loginInput: string;
}

export default class Login extends React.Component<Props, State> {
    static contextType = GlobalContext;

    constructor(props: any) {
        super(props);
        this.state = {
            loginInput: '',
        };
    }

    componentDidMount() {
        this.context.socketIo.on('login-success', (): void => {
            console.log('login-success');
            this.props.onLogin(this.state.loginInput)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.header}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.updateMessageInput}
                        value={this.state.loginInput}
                        onEndEditing={this.login}
                        placeholder={'Nickname'}
                        returnKeyType={'go'}
                    />
                    <TouchableOpacity style={styles.loginButtonContainer}>
                        <Button
                            color={StyleVars.COLOR_LIGHT}
                            title={'Login'}
                            onPress={this.login}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    private updateMessageInput = (text: string) => {
        this.setState({loginInput: text});
    }

    private login = () => {
        this.context.socketIo.emit('login', this.state.loginInput);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        padding: StyleVars.SPACE * 2,
        backgroundColor: '#e9ecef',
        borderRadius: 6,
    },
    header: {
        fontSize: 32,
        marginBottom: StyleVars.SPACE * 2,
    },
    input: {
        backgroundColor: StyleVars.COLOR_LIGHT,
        padding: 12,
        borderRadius: 6,
        borderColor: StyleVars.COLOR_BORDER,
        borderWidth: 1,
    },
    loginButtonContainer: {
        marginTop: StyleVars.SPACE * 2,
        paddingHorizontal: StyleVars.SPACE,
        backgroundColor: '#0073b1',
        borderRadius: 6,
    },
});
