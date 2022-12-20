import React, { useState , useEffect } from "react";
import { FlatList,SafeAreaView,StyleSheet, Text, TouchableOpacity, View } from "react-native";

const data = [
  {
    id: "1",
    title: "Blood",
  },
  {
    id: "2",
    title: "Plasma",
  },
  {
    id: "3",
    title: "Plate",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);


export default function MultiButton ({returnType}) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    selectedId != null ? returnType(data[selectedId-1].title) : ""
  });
  
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
      <Text style={styles.textTop}>24/12/2022</Text>
      <Text style={styles.textBottom}>You can donate now !</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
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
  textBottom:
  {
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 60,
    fontSize: 15,
  },
});
