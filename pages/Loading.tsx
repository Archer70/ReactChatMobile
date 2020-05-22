import {Text, View, StyleSheet} from "react-native";
import React from "react";
import StyleVars from "../css/vars";

export default function LoadingScreen(): JSX.Element {
    return (
        <View style={styles.loadingScreen}>
            <Text style={styles.headerText}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 26,
        color: StyleVars.COLOR_LIGHT,
    },
});
