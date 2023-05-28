import React, {Fragment, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import MyTheme from '../theme';
import {moderateScale} from '../utils/scaleUnits';
import BaseNav from '../components/baseNav';
import {useScan} from '../context/scan';

function Result() {
  const {column, data, scanned} = useScan();

  const [result, setResult] = useState<Record<string, any> | undefined>(
    undefined,
  );

  function isNumeric(str: string) {
    if (typeof str !== 'string') {
      return false;
    } // we only process strings!
    return (
      !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  useEffect(() => {
    if (!data || !scanned || !column) {
      return;
    }
    const numeric = isNumeric(scanned);
    console.log(scanned);

    const find = data.find(d => {
      return numeric
        ? Number(d[column]) === Number(scanned)
        : d[column].toString().toLowerCase() === scanned.toLowerCase();
    });

    if (!find) {
      return;
    }

    setResult(find);

    return () => {
      setResult(undefined);
    };
  }, [data, scanned, column]);

  if (!result || Object.keys(result).length === 0) {
    return (
      <Fragment>
        <View style={styles.head}>
          <Image
            style={styles.img}
            source={require('../../assets/notfound.webp')}
          />
          <Text style={styles.errTitle}>{scanned}</Text>
          <Text style={styles.text}>
            Code you scanned does'nt exist in the spreadsheet
          </Text>
        </View>

        <BaseNav color={MyTheme.colors.black} />
      </Fragment>
    );
  }

  if (Object.keys(result).length <= 2) {
    return (
      <Fragment>
        <ScrollView>
          <Image
            style={{
              width: 300,
              height: 180,
              alignSelf: 'center',
              marginVertical: 20,
            }}
            source={require('../../assets/found.webp')}
          />

          <View style={{alignItems: 'center', padding: 20}}>
            {Object.keys(result).map((key, i) => {
              if (Object.keys(result).length > 1 && key === column) {
                return null;
              }

              const val = result[key] as any;
              // const val = '999';

              let fontSize = 30;

              if (val.length <= 5) {
                fontSize = moderateScale(110);
              } else if (val.length <= 10) {
                fontSize = moderateScale(60);
              } else if (val.length <= 20) {
                fontSize = moderateScale(40);
              } else if (val.length <= 40) {
                fontSize = moderateScale(35);
              }

              return (
                <Fragment key={i}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: '700',
                        textTransform: 'capitalize',
                        fontSize: 20,
                        marginBottom: 10,
                        opacity: 0.7,
                        textAlign: 'center',
                      },
                    ]}>
                    {key}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        textAlign: 'center',
                        fontWeight: '900',
                        fontSize: fontSize,
                      },
                    ]}>
                    {val}
                  </Text>
                </Fragment>
              );
            })}
          </View>
          <View style={{height: 200}}></View>
        </ScrollView>
        <BaseNav color={MyTheme.colors.black} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ScrollView>
        <Image
          style={{
            width: 300,
            height: 180,
            alignSelf: 'center',
            marginTop: 20,
          }}
          source={require('../../assets/found.webp')}
        />
        <Text
          style={[styles.errTitle, {alignSelf: 'center', marginBottom: 50}]}>
          {scanned}
        </Text>
        <View>
          {Object.keys(result).map((key, i) => (
            <View
              key={i}
              style={[
                styles.rowWrapper,
                i === 0 && {borderTopWidth: 1, borderTopColor: '#6b63ff30'},
              ]}>
              <Text style={[styles.rowLabel, styles.text]}>{key}</Text>
              <Text style={[styles.rowValue, styles.text]}>{result[key]}</Text>
            </View>
          ))}
        </View>
        <View style={{height: 200}}></View>
      </ScrollView>
      <BaseNav color={MyTheme.colors.black} />
    </Fragment>
  );
}

export default Result;

const styles = StyleSheet.create({
  head: {
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    color: MyTheme.colors.text,
  },
  img: {width: 400, height: 400},
  errTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: MyTheme.colors.text,
    opacity: 0.7,
    marginBottom: 5,
  },
  rowWrapper: {
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomColor: '#6b63ff30',
  },
  rowLabel: {
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 15,
    paddingHorizontal: 30,
    backgroundColor: '#6b63ff20',
    paddingVertical: 10,
  },
  rowValue: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    fontSize: 18,
  },
});
