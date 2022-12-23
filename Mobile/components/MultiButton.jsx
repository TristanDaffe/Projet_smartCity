import React, { useState , useEffect } from "react";
import { FlatList,SafeAreaView,StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DonationTypesContext } from '../context/donationTypeContext';
import Separator from '../components/separator';

import { DonationUserContext } from "../context/donationUserContext";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);


export default function MultiButton ({returnType}) {
  const [selectedId, setSelectedId] = useState(null);
  const {donationTypes } = React.useContext(DonationTypesContext);
  const {lastDonationOfType} = React.useContext(DonationUserContext);

  useEffect(() => {
    selectedId != null ? returnType(donationTypes[selectedId-1]) : ""
  
  });

  
  function timeBeforeDonation(date){
    let time = 0;
    if(date !== undefined){
      time = Math.floor((new Date(date.date) - new Date()) / (1000 * 60 * 60 * 24));
      if(time < 0){
        return 'You can donate now';
      }
      return time +" days before you can donate";
    }
    else {
      return 'You can donate now';
  }
}
  
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "red" : "grey";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <View>
          <Item
          item={item}
          onPress={() => {
            setSelectedId(item.id)
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
        <Text style={styles.textTop}>Last donation :</Text>
        <Text style={styles.text}>{lastDonationOfType[item.id-1]?.date.substr(0, 10)}</Text>
        <Text style={styles.textTop}>{timeBeforeDonation(lastDonationOfType[item.id-1])}</Text>
        <Separator/>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={donationTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 32,
    width: 175,
    height: 60,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 15,
    alignSelf: 'center',
  },
  textTop:
  {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 60,
  },
  text:
  {
    fontWeight: 'bold',
    marginLeft: 60,
    fontSize: 15,
  },
});
