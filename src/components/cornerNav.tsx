import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../utils/scaleUnits';

const CornerNav = ({children}: {children: ReactNode}) => {
  return <View style={styles.container}>{children}</View>;
};

export default CornerNav;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: scale(20),
    right: scale(20),
    zIndex: 100,
  },
});
