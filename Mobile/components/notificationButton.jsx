import React, { useState } from "react";
import { TextInput, AppRegistry, Switch, StyleSheet, Text, View } from "react-native";

export default function textField(props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.Switchcontainer}>
          <Switch
            trackColor={{ false: "#a4a4a4", true: "#a4a4a4" }}
            thumbColor={isEnabled ? "#e10b0b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          /> 
          <Text style={styles.text}> Notifications </Text>
      </View>
    );
    
}

const styles = StyleSheet.create({
  Switchcontainer: {
    position: 'fixed',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  }
});  