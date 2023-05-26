import React, {useMemo} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useScan} from '../context/scan';
import {Text} from 'react-native-svg';
import {scale} from '../utils/scaleUnits';
import MyTheme from '../theme';
import {StyleSheet} from 'react-native';
import {setColumnCache} from '../utils/cache';

function SelectColumn() {
  const {data, column, setColumn} = useScan();

  const colList = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return Object.keys(data[0]);
  }, [data]);

  return (
    <SelectDropdown
      data={colList}
      defaultButtonText="Select Column To Scan"
      defaultValue={column || ''}
      renderDropdownIcon={() => (
        <Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Text>
      )}
      onSelect={async selectedItem => {
        setColumn(selectedItem);
        await setColumnCache(selectedItem);
      }}
      buttonTextAfterSelection={selectedItem => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={item => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      buttonStyle={styles.selectBtn}
      dropdownStyle={styles.dropdownStyle}
      rowStyle={styles.rowStyle}
      selectedRowStyle={styles.selectedRowStyle}
      selectedRowTextStyle={styles.selectedRowTextStyle}
      rowTextStyle={styles.rowTextStyle}
    />
  );
}

export default SelectColumn;

const styles = StyleSheet.create({
  selectBtn: {
    backgroundColor: MyTheme.colors.white,
    borderWidth: 2,
    borderColor: MyTheme.colors.black,
    width: '80%',
    borderRadius: scale(6),
    height: scale(40),
    marginBottom: 20,
  },
  dropdownStyle: {
    backgroundColor: MyTheme.colors.white,
    borderRadius: scale(6),
  },
  rowStyle: {
    padding: 0,
    height: 50,
  },
  selectedRowStyle: {
    backgroundColor: MyTheme.colors.primary,
  },
  selectedRowTextStyle: {
    color: '#fff',
  },
  rowTextStyle: {
    fontSize: scale(14),
    fontWeight: '500',
  },
});
