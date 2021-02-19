import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      unsubscribe = ref.onSnapshot((snapshot) => {
        const userMemos = []; // 一時的な配列
        snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          const data = doc.data(); // メモ情報の加工
          userMemos.push({ // 加工した情報を配列に入れる
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(), // タイムスタンプをJSのDate型に変換
          });
        });
        setMemos(userMemos); // 保存
      }, (error) => {
        console.log(error);
        Alert.alert('データの読み込みに失敗しました．');
      });
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
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
