import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import ScanFrame from '../components/scanFrame';

import ScanNav from '../components/scanNav';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useScan} from '../context/scan';
import {useScanBarcodes} from '../hooks/scanner';
import {BarcodeFormat} from 'vision-camera-code-scanner';

function Scanner() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [color, setColor] = React.useState('white');
  const [points, setPoints] = useState(undefined);
  const [torch, setTorch] = useState<'on' | 'off'>('off');

  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const WINDOW_WIDTH = Dimensions.get('window').width;

  const navigation = useNavigation<any>();

  const focused = useIsFocused();
  const {scanned, setScanned, data, setColumn, column} = useScan();

  const devices = useCameraDevices();
  const device = devices.back;

  const hasTorch = device?.hasTorch || false;

  const viewfinderHeight = 300;
  const viewfinderWidth = 300;

  const {height: windowHeight, width: windowWidth} = Dimensions.get('window');
  const viewFinderBounds = {
    height: viewfinderHeight,
    width: viewfinderWidth,
    x: (windowWidth - viewfinderWidth) / 2,
    y: (windowHeight - viewfinderHeight) / 4,
  };

  const aabb = (barcode, frameWidth, frameHeight) => {
    try {
      const {cornerPoints} = barcode;

      const frWidth = Math.min(frameHeight, frameWidth);
      const frHeight = Math.max(frameHeight, frameWidth);

      const xRatio = frWidth / WINDOW_WIDTH;
      const yRatio = frHeight / WINDOW_HEIGHT;

      const xArray = cornerPoints.map(corner => parseFloat(corner.x));
      const yArray = cornerPoints.map(corner => parseFloat(corner.y));

      const left = Math.min(...xArray);
      const right = Math.max(...xArray);
      const bottom = Math.max(...yArray);
      const top = Math.min(...yArray);

      const x = left / xRatio;
      const y = top / yRatio;
      const width = (right - left) / xRatio;
      const height = (bottom - top) / xRatio;
      setPoints({x, y, width, height});
      return (
        cornerPoints.length === 4 &&
        viewFinderBounds.x <= x &&
        viewFinderBounds.x + viewFinderBounds.width >= x + width &&
        viewFinderBounds.y <= y &&
        viewFinderBounds.y + viewFinderBounds.height >= y + height
      );
    } catch (error) {
      setPoints(undefined);
      return false;
    }
  };

  const [frameProcessor, barcodes, frameWidth, frameHeight] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );

  const getPermission = async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
  };

  useEffect(() => {
    if (!data || data.length === 0 || !column) {
      setColumn(undefined);
      navigation.replace('picker');
    }

    if (focused) {
      setColor('white');
      setScanned('');
    }

    getPermission();
    return () => {
      setTorch('off');
      setColor('white');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  useEffect(() => {
    if (!scanned) return;
    setTorch('off');

    const timer = setTimeout(() => {
      navigation.navigate('result');
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanned]);
  // console.log(barcodes);

  useEffect(() => {
    if (scanned) return;
    const collides = aabb(barcodes[0], frameWidth, frameHeight);

    if (collides) {
      setScanned(prev => (!prev ? barcodes[0].displayValue : prev));
      setColor('lime');
    } else {
      setColor('white');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodes]);

  if (device && hasPermission) {
    return (
      <View style={{position: 'relative', flex: 1}}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={focused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
          torch={(focused && torch) || 'off'}
        />
        <ScanFrame {...viewFinderBounds} color={color} />

        <ScanNav torch={torch} setTorch={setTorch} hasTorch={hasTorch} />
      </View>
    );
  } else {
    return null;
  }
}

export default Scanner;
