import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { dateToString } from '../utilities'; // index.jsは自動で読み取られる．

export default function MemoDetailScreen(props) {
  // routeはreact-navigationに入っている
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      unsubscribe = ref.onSnapshot((doc) => {
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAt: data.updatedAt.toDate(),
        });
      });
    }
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text style={styles.MemoDate}>{memo && dateToString(memo.updatedAt)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
        </Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, bottom: 'auto' }}
        name="edit"
        onPress={() => { navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText }); }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // bg-cream
    backgroundColor: '#fdfdf9',
  },
  memoHeader: {
    backgroundColor: '#fcc898',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  MemoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
