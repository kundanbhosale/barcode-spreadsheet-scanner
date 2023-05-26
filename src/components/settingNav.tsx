import React from 'react';
import CornerNav from './cornerNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyledButton from './button';
import {useNavigation} from '@react-navigation/native';
import {useScan} from '../context/scan';

function SettingNav() {
  const {data} = useScan();
  const navigation = useNavigation<any>();
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <CornerNav>
      <StyledButton
        icon
        type="dark"
        onPress={() => {
          navigation.navigate('settings');
        }}
        style={{width: 50, height: 50}}>
        <Ionicons name="settings-outline" size={30} color={'#fff'} />
      </StyledButton>
    </CornerNav>
  );
}

export default SettingNav;
