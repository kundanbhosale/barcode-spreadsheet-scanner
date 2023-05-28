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
  const [torch, setTorch] = useState<'on' | 'off'>('off');

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

  // runOnUI(useScanBarcodes)([BarcodeFormat.ALL_FORMATS], {
  //   checkInverted: true,
  // });

  const [frameProcessor, result] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    viewFinderBounds,
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

    if (result) {
      setScanned(prev => (!prev ? result.displayValue : prev));
      setColor('lime');
    } else {
      setColor('white');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  if (device && hasPermission) {
    return (
      <View style={{position: 'relative', flex: 1}}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={focused}
          frameProcessor={frameProcessor}
          videoStabilizationMode="auto"
          preset="high"
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
