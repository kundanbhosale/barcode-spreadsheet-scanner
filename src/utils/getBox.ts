import {Rect} from 'vision-camera-code-scanner';

const getBox = (rect: Rect | undefined) => {
  if (!rect) {
    return {x: 0, y: 0, width: 0, height: 0};
  }
  const x = rect?.left;
  const y = rect.top;
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  return {x, y, width, height};
};

export default getBox;
