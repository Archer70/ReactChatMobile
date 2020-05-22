import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from "react-native";
import Message from "../components/Message";
import StyleVars from '../css/vars';
import GlobalContext from "../globals/GlobalContext";

interface MessageInterface {
    isServer: boolean,
    name: string,
    text: string,
}

interface Props {
    name: string;
}

interface State {
    messageInput: string,
    messages: MessageInterface[];
}

export default class Chat extends React.Component<Props, State> {
    static contextType = GlobalContext;

    constructor(props: any) {
        super(props);

        this.state = {
            messageInput: '',
            messages: [],
        };
    }

    componentDidMount() {
        this.context.socketIo.on('chat-message', (message: MessageInterface) => {
            this.addMessage(message)
        });
    }

    render() {
        // Add `key` for list support.
        const messages = this.state.messages.map(
            (message, key) => ({
                key: key.toString(),
                name: message.name,
                text: message.text,
                isServer: message.isServer,
            })
        );

        return (
            <View style={styles.chatContainer}>
                <FlatList
                    data={messages}
                    renderItem={({item}) => <Message message={item} />}
                    style={styles.messages}
                />
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.updateMessageInput}
                        value={this.state.messageInput}
                        onEndEditing={this.sendMessage}
                        placeholder={'Message'}
                        returnKeyType={'send'}
                    />
                </View>
            </View>
        )
    }

    private updateMessageInput = (text: string) => {
        this.setState({messageInput: text});
    }

    private sendMessage = () => {
        const message = {
            isServer: false,
            name: this.props.name,
            text: this.state.messageInput,
        };

        this.addMessage(message, true);
        this.context.socketIo.emit('chat-message', message);
    }

    private addMessage(message: MessageInterface, clearInput: boolean = false) {
        this.setState(state => ({
            messages: state.messages.concat(message),
        }), () => {
            // scroll down, maybe
        });

        if (clearInput) {
            this.setState({messageInput: ''});
        }
    }
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    messages: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 60,
        left: 0,
    },
    inputSection: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 60,
        paddingHorizontal: StyleVars.SPACE,
        backgroundColor: StyleVars.COLOR_DARK,
    },
    input: {
        backgroundColor: StyleVars.COLOR_LIGHT,
        padding: 12,
        borderRadius: 6,
    }
});

// TYPESCRIPT
// NEWB
