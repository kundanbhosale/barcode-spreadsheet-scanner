import React, {ReactNode, useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Theme from '../theme';
import {scale} from '../utils/scaleUnits';

type ButtonTypes = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactNode;
  size?: 'sm' | 'base' | 'lg';
  type?: 'primary' | 'secondary' | 'dark' | 'white' | 'danger';
  icon?: boolean;
  style?: ViewStyle;
};

function StyledButton({
  onPress,
  children,
  size,
  icon,
  type,
  style,
}: ButtonTypes) {
  const [isDisabled, setDisabled] = useState(false);

  const handlePress = (e: GestureResponderEvent) => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 300);
    onPress && onPress(e);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.appButtonDisabled,
        type === 'dark' && styles.darkBtn,
        type === 'white' && styles.whiteBtn,
        type === 'danger' && styles.dangerBtn,

        size === 'sm' && styles.smBtn,
        size === 'lg' && styles.lgBtn,
        icon && styles.icon,
        style && style,
      ]}
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={isDisabled}>
      <Text
        style={[
          styles.btnText,
          size === 'sm' && styles.smTxt,
          size === 'lg' && styles.lgTxt,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default StyledButton;

const styles = StyleSheet.create({
  appButtonDisabled: {
    opacity: 0.8,
  },
  btnText: {
    color: Theme.colors.white,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '500',
    letterSpacing: 0.8,
    margin: 0,
    padding: 0,
  },
  button: {
    paddingVertical: scale(15),
    paddingHorizontal: scale(30),
    backgroundColor: Theme.colors.primary,
    borderRadius: 50,
    alignSelf: 'center',
  },
  smBtn: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  lgBtn: {
    paddingVertical: scale(17),
    paddingHorizontal: scale(50),
  },
  smTxt: {
    fontSize: 12,
  },
  lgTxt: {
    fontSize: 18,
  },
  icon: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
    alignSelf: 'center',
  },

  darkBtn: {
    backgroundColor: Theme.colors.black,
  },
  dangerBtn: {
    backgroundColor: Theme.colors.danger,
  },
  whiteBtn: {
    backgroundColor: '#ffffff70',
  },
});
