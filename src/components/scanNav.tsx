import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import StyledButton from './button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../theme';
import NavBar from './navBar';
import {scale} from '../utils/scaleUnits';
import {useNavigation} from '@react-navigation/native';

const ScanNav = ({
  hasTorch,
  torch,
  setTorch,
}: {
  hasTorch: boolean;
  torch: 'on' | 'off';
  setTorch: React.Dispatch<React.SetStateAction<'on' | 'off'>>;
}) => {
  const navigation = useNavigation<any>();

  const handleNav = useCallback(
    (val: string) => {
      setTorch('off');
      setTimeout(() => {
        navigation.navigate(val);
      }, 100);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [torch],
  );

  return (
    <NavBar>
      <View style={styles.wrapper}>
        <StyledButton
          icon
          type="white"
          onPress={() => {
            handleNav('settings');
          }}
          style={{width: 60, height: 60}}>
          <Ionicons name="settings-outline" size={30} color={'#fff'} />
        </StyledButton>
        <StyledButton
          icon
          type="danger"
          onPress={() => {
            handleNav('home');
          }}
          style={{
            width: 120,
            height: 120,
            borderWidth: 4,
            borderColor: Theme.colors.white,
          }}>
          {/* <AntDesign name="scan1" size={70} color={'#fff'} /> */}
          <Ionicons name="close" size={70} color={'#fff'} />
        </StyledButton>
        {hasTorch ? (
          <StyledButton
            icon
            type="white"
            onPress={() =>
              setTorch((prev: any) => (prev === 'on' ? 'off' : 'on'))
            }
            style={{width: 60, height: 60}}>
            <Ionicons
              name={torch === 'on' ? 'flash-off' : 'flash'}
              size={30}
              color={'#fff'}
            />
          </StyledButton>
        ) : (
          <View style={{width: 60, height: 60}} />
        )}
      </View>
    </NavBar>
  );
};

export default ScanNav;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 40,
    width: scale(300),
    // backgroundColor: 'red',
  },
});
