import React, { Component } from "react";
import { TextInput, AppRegistry, Switch,StyleSheet, Text, View } from "react-native";

export default function textField({ placeHolder }) {
  const [number, onChangeNumber] = React.useState(null);
  return (
    <TextInput
      style={styles.textField}
      //ça c'est pour récupérer la valeur de l'input
      onChangeText={onChangeNumber}
      value={number}
      placeholder = {placeHolder}
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
    width: 350,
    marginBottom : 5,
    marginTop: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "red",
    borderWidth: 3,
  },
});
