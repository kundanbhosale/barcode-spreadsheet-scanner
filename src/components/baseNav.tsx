import React from 'react';
import NavBar from './navBar';
import StyledButton from './button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import MyTheme from '../theme';
import {StyleSheet, Text} from 'react-native';
import {moderateScale} from '../utils/scaleUnits';

function BaseNav({color, text}: {color?: string; text?: string}) {
  const navigation = useNavigation<any>();

  return (
    <NavBar>
      <Text
        style={[styles.actionTxt, {color: color || MyTheme.colors.primary}]}>
        {text}
      </Text>

      <StyledButton
        icon
        style={{
          width: 120,
          height: 120,
          backgroundColor: color || MyTheme.colors.primary,
        }}
        onPress={() => navigation.navigate('scanner')}>
        <AntDesign name="scan1" size={70} color={MyTheme.colors.white} />
      </StyledButton>
    </NavBar>
  );
}

export default BaseNav;

const styles = StyleSheet.create({
  actionTxt: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: moderateScale(15),
    textAlign: 'center',
    position: 'absolute',
    top: '-25%',
  },
});
