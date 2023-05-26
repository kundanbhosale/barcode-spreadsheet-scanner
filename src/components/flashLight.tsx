import React from 'react';
import {StyleSheet, View} from 'react-native';
import StyledButton from './button';
import Ionicons from 'react-native-vector-icons/Ionicons';

function FlashLight() {
  return (
    <View style={styles.container}>
      <StyledButton
        icon
        onPress={() => console.log('click')}
        style={{width: 120, height: 120}}>
        <Ionicons name="flash" size={70} color={'#fff'} />
      </StyledButton>
    </View>
  );
}

export default FlashLight;

const styles = StyleSheet.create({
  container: {},
});
