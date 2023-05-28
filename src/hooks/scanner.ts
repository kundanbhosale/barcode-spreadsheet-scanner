import {Frame, useFrameProcessor} from 'react-native-vision-camera';
import {useState} from 'react';
import {runOnJS} from 'react-native-reanimated';
import {
  Barcode,
  BarcodeFormat,
  CodeScannerOptions,
  scanBarcodes,
} from 'vision-camera-code-scanner';
import {Dimensions} from 'react-native';

export function useScanBarcodes(
  types: BarcodeFormat[],
  viewFinderBounds: {x: number; y: number; width: number; height: number},
  options?: CodeScannerOptions,
): [(frame: Frame) => void, Barcode | undefined] {
  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const WINDOW_WIDTH = Dimensions.get('window').width;

  const [result, setResult] = useState<Barcode | undefined>(undefined);
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';

    const aabb = (
      barcode: Barcode,
      frameWidth: number,
      frameHeight: number,
    ) => {
      try {
        const {cornerPoints} = barcode;

        if (!cornerPoints) {
          return false;
        }

        const frWidth = Math.min(frameHeight, frameWidth);
        const frHeight = Math.max(frameHeight, frameWidth);

        const xRatio = frWidth / WINDOW_WIDTH;
        const yRatio = frHeight / WINDOW_HEIGHT;

        const xArray = cornerPoints.map(corner => parseFloat(corner.x as any));
        const yArray = cornerPoints.map(corner => parseFloat(corner.y as any));

        const left = Math.min(...xArray);
        const right = Math.max(...xArray);
        const bottom = Math.max(...yArray);
        const top = Math.min(...yArray);

        const x = left / xRatio;
        const y = top / yRatio;
        const width = (right - left) / xRatio;
        const height = (bottom - top) / xRatio;
        return (
          cornerPoints.length === 4 &&
          viewFinderBounds.x <= x &&
          viewFinderBounds.x + viewFinderBounds.width >= x + width &&
          viewFinderBounds.y <= y &&
          viewFinderBounds.y + viewFinderBounds.height >= y + height
        );
      } catch (error) {
        return false;
      }
    };

    const detectedBarcodes = scanBarcodes(frame, types, options);
    detectedBarcodes.forEach(b => {
      const collides = aabb(b, frame.width, frame.height);
      if (collides) {
        runOnJS(setResult)(b);
      }
    });
  }, []);

  return [frameProcessor, result];
}
