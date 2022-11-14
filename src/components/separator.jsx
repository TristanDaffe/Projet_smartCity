import React, { Component } from "react";
import { TextInput, AppRegistry, Switch, StyleSheet, Text, View } from "react-native";

export default function separator() {
    return (
        <View style={styles.separator} />
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: "transparent",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
