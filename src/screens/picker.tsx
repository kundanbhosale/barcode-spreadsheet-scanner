import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import StyledButton from '../components/button';
import {moderateScale, scale} from '../utils/scaleUnits';
import DocumentPicker from 'react-native-document-picker';
import MyTheme from '../theme';
import {useScan} from '../context/scan';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import SelectColumn from '../components/selectColumn';
import {setFileCache} from '../utils/cache';
import {readSheet} from '../utils/readSheet';

const DocPicker = () => {
  const {data, setData, column, setFile} = useScan();
  const [error, setError] = useState('');
  const focused = useIsFocused();

  const navigation = useNavigation<any>();

  const pickDocument = async () => {
    try {
      setError('');
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [
          'application/vnd.oasis.opendocument.spreadsheet',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv',
          'text/comma-separated-values',
        ],
      });

      readSheet(
        pickerResult.fileCopyUri || pickerResult.uri,
        setData,
        setError,
      );
      const file = {
        filename: pickerResult.name || 'untitled',
        lastModified: new Date().getTime(),
        path: pickerResult.fileCopyUri || pickerResult.uri,
        size: pickerResult.size || 0,
        type: 'file' as any,
      };
      await setFileCache(file);
      setFile(file);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    setError('');

    if (focused && data && data.length > 0 && column) {
      navigation.navigate('scanner');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, column, focused]);

  const renderer = () => {
    if (!data || data.length === 0) {
      return (
        <>
          <StyledButton
            onPress={() => pickDocument()}
            size="lg"
            style={{marginBottom: 15}}>
            Add SpreadSheet
          </StyledButton>
          <Text
            style={[
              styles.description,
              {color: error ? MyTheme.colors.danger : MyTheme.colors.text},
            ]}>
            {error
              ? error
              : 'Choose the spreadsheet you want to scan using inventory-scanner'}{' '}
          </Text>
        </>
      );
    } else if (!column) {
      return (
        <>
          <SelectColumn />
          <Text style={styles.description}>
            Choose the column from spreadsheet you want to scan.
          </Text>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/empty.webp')} style={styles.image} />
      {renderer()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: scale(300),
    height: scale(300),
    margin: 'auto',
    resizeMode: 'contain',
  },

  description: {
    width: moderateScale(200, 2),
    fontSize: scale(14),
    textAlign: 'center',
    color: MyTheme.colors.text,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanTxt: {
    color: MyTheme.colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },

  iconBtn: {
    backgroundColor: MyTheme.colors.primary,
    width: scale(100),
    height: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(100),
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: scale(20),
  },
  // label: {
  //   fontSize: 14,
  //   fontWeight: '500',
  // },
});

export default DocPicker;
