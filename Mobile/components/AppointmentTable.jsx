import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Table, Row, } from "react-native-table-component";

const appointment1 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "21/02/2022",
};

const appointment2 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Plasma",
  date: "24/04/2022",
};

const appointment3 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Plasma",
  date: "05/06/2022",
};

const appointment4 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "14/07/2022",
};

const appointment5 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "15/09/2022",
};

const appointment6 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "18/11/2022",
};

const appointment7 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "20/12/2022",
};

const appointment8 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "21/12/2022",
};  

const appointment9 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "22/12/2022",
};

const appointment10 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "23/12/2022",
};

const appointment11 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "24/12/2022",
};

const appointment12 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "25/12/2022",
};

const appointment13 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "26/12/2022",
};

const appointment14 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "27/12/2022",
};

const appointment15 = {
  center: "Don de sang Croix-Rouge Namur",
  type: "Blood",
  date: "28/12/2022",
};

const appointment16 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "29/12/2022",
};

const appointment17 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "30/12/2022",
};

const appointment18 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "31/12/2022",
};

const appointment19 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "01/01/2023",
};

const appointment20 = {
  center: "Don de sang à Marche-en-Famenne",
  type: "Plasma",
  date: "02/01/2023",
};





// ça c'est ce qu'on get de l'API
const appointments_raw = [
  [
    appointment1,
    appointment2,
    appointment3,
    appointment4,
    appointment5,
    appointment6,
    appointment7,
    appointment8,
    appointment9,
    appointment10,
    appointment11,
    appointment12,
    appointment13,
    appointment14,
    appointment15,
    appointment16,
    appointment17,
    appointment18,
    appointment19,
    appointment20,


  ]
];

// ça c'est converti pour la table
let appoitmentData = appointments_raw[0].map((appointment) => {
  return [appointment.center, appointment.type, appointment.date];
});

export default class AppointmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Center', 'Type', 'Date'],
      widthArr: [100, 100, 100]
    }
  }

  render() {
    const state = this.state;
    const tableData = appoitmentData;
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 2, borderColor: 'grey'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headerText}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 2, borderColor: 'grey'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: 'white'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', },
  header: { height: 50, backgroundColor: '#e10b0b' },
  headerText: { textAlign: 'center', fontWeight: '600', fontSize: 20 },
  text: { textAlign: 'center', fontSize: 14,  color: '#2b343d'},
  dataWrapper: { marginTop: -1 },
  row: { height: 80, backgroundColor: '#E7E6E1' }
});