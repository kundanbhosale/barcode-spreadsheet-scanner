import AsyncStorage from '@react-native-async-storage/async-storage';
import {FileStat} from 'react-native-file-access';

export const ColumnKey = 'column';
export const FileUriKey = 'file_uri';

export const getCache = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};

export const setCache = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
};

export const removeCache = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
};

export const getColumn = () => getCache(ColumnKey);
export const delColumn = () => removeCache(ColumnKey);
export const setColumnCache = async (value: any) =>
  await setCache(ColumnKey, value);

export const getFileUri = (): Promise<FileStat> => getCache(FileUriKey);
export const delFileUri = () => removeCache(FileUriKey);
export const setFileCache = async (value: any) =>
  await setCache(FileUriKey, value);
