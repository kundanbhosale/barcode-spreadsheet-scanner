import React, {ReactNode, useEffect, useState} from 'react';
import {delFileUri, getColumn, getFileUri} from '../utils/cache';
import {FileStat, FileSystem} from 'react-native-file-access';
import {readSheet} from '../utils/readSheet';
import {PermissionsAndroid, Platform} from 'react-native';

export type State = {
  type: 'loading' | 'error' | 'success';
  data: string;
};

export interface ScanContext {
  data: Array<Record<string, any>>;
  state: State;
  scanned: string | undefined;
  column: string | undefined;
  file: FileStat | undefined;
  setState: React.Dispatch<React.SetStateAction<State>>;
  setScanned: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumn: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFile: React.Dispatch<React.SetStateAction<FileStat | undefined>>;
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
}

const Context = React.createContext<ScanContext>({
  data: [],
  state: {
    type: 'loading',
    data: 'App is loading',
  },
  file: undefined,
  column: undefined,
  scanned: undefined,
  setState: _val => {},
  setData: _val => {},
  setScanned: _val => {},
  setColumn: _val => {},
  setFile: _val => {},
});

const ScanProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<State>({
    type: 'loading',
    data: 'App is loading',
  });
  const [data, setData] = useState<ScanContext['data']>([]);
  const [scanned, setScanned] = useState<ScanContext['scanned']>(undefined);
  const [column, setColumn] = useState<ScanContext['column']>(undefined);
  const [file, setFile] = useState<ScanContext['file']>(undefined);
  const init = async () => {
    try {
      const col = await getColumn();
      if (col) {
        setColumn(col);
      }
      const fileCache = await getFileUri();

      if (fileCache && fileCache.path) {
        FileSystem.stat(fileCache.path)
          .then(stat => {
            setFile(fileCache);
            readSheet(stat.path, setData);
          })
          .catch(async () => {
            await delFileUri();
          });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getPerms = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  useEffect(() => {
    getPerms();
    init();
  }, []);

  return (
    <Context.Provider
      value={{
        data,
        setData,
        state,
        setState,
        scanned,
        setScanned,
        column,
        setColumn,
        file,
        setFile,
      }}>
      {children}
    </Context.Provider>
  );
};
const useScan = () => {
  return React.useContext(Context);
};

export {ScanProvider, useScan};
