import React from 'react';
import { StyleSheet, View } from 'react-native';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // bg-cream
    backgroundColor: '#fdfdf9',
  },
});
