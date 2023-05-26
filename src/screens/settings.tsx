import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useScan} from '../context/scan';
import SelectColumn from '../components/selectColumn';
import StyledButton from '../components/button';
import {useNavigation} from '@react-navigation/native';
import CornerNav from '../components/cornerNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyTheme from '../theme';
import {delColumn, delFileUri} from '../utils/cache';

function Settings() {
  const {setColumn, setData, file} = useScan();

  const navigation = useNavigation<any>();

  const handleRemove = async () => {
    setColumn(undefined);
    setData([]);
    await delFileUri();
    await delColumn();
    navigation.replace('picker');
  };
  return (
    <View style={styles.container}>
      <CornerNav>
        <StyledButton
          onPress={() => navigation.goBack()}
          icon
          type="dark"
          style={{width: 50, height: 50}}>
          <Ionicons name="close" size={30} color={'#fff'} />
        </StyledButton>
      </CornerNav>
      <Image
        source={require('../../assets/settings.webp')}
        style={styles.image}
      />

      {file && (
        <>
          <Text style={styles.title}>{file?.filename}</Text>
          <Text style={{color: MyTheme.colors.text, marginBottom: 20}}>
            File Updated on{' '}
            {new Date(file?.lastModified).toLocaleDateString() +
              ' ' +
              new Date(file?.lastModified).toLocaleTimeString()}
          </Text>
        </>
      )}

      <SelectColumn />
      <StyledButton onPress={handleRemove} type="danger" size="sm">
        Remove SpreadSheet
      </StyledButton>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginBottom: 2,
    color: MyTheme.colors.text,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
  },
});
