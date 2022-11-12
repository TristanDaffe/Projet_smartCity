import React, { Component } from "react";
import { TextInput, AppRegistry, Switch,StyleSheet, Text, View } from "react-native";

export default function textField(props) {
  const [number, onChangeNumber] = React.useState(null);
  return (
    <TextInput
      style={styles.textField}
      //ça c'est pour récupérer la valeur de l'input
      onChangeText={onChangeNumber}
      value={number}
      placeholder="Joli placeholder"
      // ça c'est pour changer le type de clavier
      kkeyboardType="default"
    />
  );
}

const styles = StyleSheet.create({
  textField: {
    zIndex: 999,
    height: 40,
    fontSize: 15,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
  },
});
