import {DefaultTheme} from '@react-navigation/native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: '#6C63FF',
    black: '#343434',
    white: '#fff',
    danger: 'tomato',
  },
};
export default MyTheme;
