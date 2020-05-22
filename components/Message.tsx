import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import StyleVars from '../css/vars';

interface MessageInterface {
    key: string;
    isServer: boolean;
    text: string;
    name: string;
}

export default class Message extends React.Component<{ message: MessageInterface }, any> {
    render() {
        const message = this.props.message;
        return (
            <View style={[styles.message, message.isServer ? styles.isServer : null]}>
                <Text style={[styles.name, message.isServer ? styles.isServer : null]}>
                    {message.name}
                </Text>
                <Text style={message.isServer ? styles.isServer : null}>
                    {message.text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    message: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: StyleVars.SPACE,
        borderBottomWidth: 1,
        borderBottomColor: StyleVars.COLOR_BORDER,
    },
    name: {
        fontWeight: 'bold',
    },
    isServer: {
        fontStyle: 'italic',
        backgroundColor: '#faebd7',
    },
});
