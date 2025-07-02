import {useEffect, useState} from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

type props = {
    onChangeText: (text: string) => void,
    text: string,
    testID: string
};

export default function index({onChangeText, text, testID}: props) {
    return (
      <View style={styles.container}  >
          <TextInput
              testID={testID}
              style={styles.ti}
              value={text}
              onChangeText={onChangeText}
              numberOfLines={80}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
      paddingHorizontal: 15,
      paddingVertical: 15,
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgray',
      borderRadius: 20,
  },
  ti:{
      width: 300,
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 10
  },
  button: {
      width: 300
  }
});
