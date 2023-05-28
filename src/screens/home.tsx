import React, {Fragment} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Theme from '../theme';
import {scale} from '../utils/scaleUnits';
import BaseNav from '../components/baseNav';
import SettingNav from '../components/settingNav';

function Home() {
  return (
    <Fragment>
      <SettingNav />
      <View style={styles.container}>
        <SettingNav />
        <Image
          style={styles.img}
          source={require('../../assets/spreadsheets.webp')}
        />
        <Text style={{color: 'black'}}>V1</Text>
        <Text style={styles.heading}>Spreadsheet Barcode Scanner</Text>
        <Text style={styles.tagline}>
          Unlock the Power of Scanning: Retrieve Data from your Spreadsheets by
          scanning Barcodes and QR Codes !
        </Text>
      </View>
      <BaseNav text="Scan Code" />
    </Fragment>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: scale(50),
  },
  img: {
    width: scale(300),
    height: scale(300),
  },
  heading: {
    fontSize: scale(20),
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: Theme.colors.black,
    marginBottom: 5,
  },
  tagline: {
    fontSize: scale(14),
    textAlign: 'center',
    color: Theme.colors.black,
    width: scale(300),
  },
});
