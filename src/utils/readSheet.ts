import {FileSystem} from 'react-native-file-access';
import {read, utils} from 'xlsx';

export const readSheet = (
  path: string,
  setData: (_val: any) => void,
  setError?: (_val: any) => void,
) => {
  FileSystem.readFile(path, 'base64')
    .then(b64 => {
      return read(b64, {type: 'base64'});
    })
    .then(wb => {
      const wsname = wb.SheetNames[0];

      const d = utils.sheet_to_json(wb.Sheets[wsname]);
      if (d.length === 0) {
        throw Error('Invalid sheet');
      }
      setData(d as any);
    })
    .catch(() => {
      setError &&
        setError(
          'Spreadsheet must have atleast 2 rows - first as column row and second as values row',
        );
    });
};
