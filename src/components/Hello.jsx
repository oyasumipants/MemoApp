import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { string, bool, shape } from 'prop-types';

function Hello(props) {
  const { children, bang, style } = props;
  return (
    <View>
      <Text style={[styles.text, style]}>
        {`Hello ${children}${bang ? '!' : ''}`}
      </Text>
    </View>
  );
}

// propsの型を定義する
Hello.propTypes = {
  children: string.isRequired,
  bang: bool,
  // オブジェクトを形づける型
  style: shape(),
};

// propsのdefalt値
Hello.defaultProps = {
  bang: false,
  style: null,
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    backgroundColor: '#98BAFC',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 16,
  },
});

export default Hello;
