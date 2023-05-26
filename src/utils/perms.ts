import {PermissionsAndroid, Platform} from 'react-native';

export const requestStoragePermission = async () => {
  try {
    if (Platform.OS !== 'android') return true;

    const pm1 = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const pm2 = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (pm1 && pm2) return true;

    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    console.log(userResponse);
    if (
      userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
      userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
