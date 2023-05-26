import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {BBox} from '../../types';

function ScanFrame({width, height, x, y, color}: BBox & {color?: string}) {
  const styles = StyleSheet.create({
    svg: {
      position: 'absolute',
      width: width,
      height: height,
      left: x,
      top: y,
    },
  });
  return (
    <Svg viewBox="0 0 193 193" style={styles.svg} fill={'none'}>
      <Path
        d="M1 51V5.9453C1 3.47278 2.5 0.999931 5.75 1H51M51 192H5.9453C3.47278 192 0.999931 190.5 1 187.25V142M192 142V187.055C192 189.528 190.5 192.001 187.25 192H142M142 1H187.055C189.528 1 192.001 2.5 192 5.75V51"
        stroke={color || 'white'}
        strokeWidth={4}
      />
    </Svg>
  );
}

export default ScanFrame;
