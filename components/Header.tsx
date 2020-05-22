import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import StyleVars from "../css/vars";
import GlobalContext from "../globals/GlobalContext";

interface Props {
    appLoaded: boolean,
}

interface State {
    onlineUsers: number;
}

export default class Header extends React.Component<Props, State> {
    static contextType = GlobalContext;

    constructor(props: any) {
        super(props);
        this.state = {
            onlineUsers: 0,
        };
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<State>, snapshot?: any) {
        if (this.props.appLoaded) {
            this.context.socketIo.on('user-count-update', (count: number) => {
                this.setState({onlineUsers: count});
            });
        }
    }

    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>React Chat</Text>
                <TouchableOpacity style={styles.usersButtonContainer}>
                    <Button
                        color={StyleVars.COLOR_LIGHT}
                        title={`Online (${this.state.onlineUsers})` }
                        onPress={() => {}}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25,
        height: 75,
        paddingHorizontal: StyleVars.SPACE,
        backgroundColor: StyleVars.COLOR_DARK,
    },
    headerText: {
        color: StyleVars.COLOR_LIGHT,
        fontSize: 24,
    },
    usersButtonContainer: {
        paddingHorizontal: StyleVars.SPACE,
        backgroundColor: '#0073b1',
        borderRadius: 6,
    },
    usersButton: {
        color: '#fff',
    },
})
