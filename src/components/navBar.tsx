import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {scale} from '../utils/scaleUnits';
const screen = Dimensions.get('screen');

function NavBar({children, style}: {children: ReactNode; style?: StyleMedia}) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export default NavBar;

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: scale(150),
    position: 'absolute',
    left: 0,
    bottom: 0,
    alignItems: 'center',
  },
});
