import { StyleSheet, View, Text, ScrollView, Button, TouchableHighlight, TextInput, Alert } from 'react-native';
import MainContainer from '../../components/MainConstainer'
import TextField from '../../components/TextField'
import {useEffect, useState} from 'react';
import asyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../constants/colors';
import {Link, useFocusEffect, useRouter} from 'expo-router';
import {useSearchParams} from 'expo-router/build/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40
  },
  sectionHeader:{
    color:'rgb(0, 0, 0)',
    fontSize: 24,
    textAlign: 'center'
  },
  menu: {
    borderBottomColor: colors.secundary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 0,
    gap: 5,
    padding: 5
  },
  saveButton:{
    borderRadius: 10,
    backgroundColor: 'chartreuse',
    color: colors.primary,
    padding: 10
  },
  saveButtonText: {
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
  },
  titleInput: {
      backgroundColor: 'white',
      borderRadius: 10,
      flex: 1,
      fontSize: 24,
      textAlign: 'center',
      paddingVertical: 10
  }
});

export default function index()
{
  const [[_, id]]  = useSearchParams();
  const [data, setData]:any[] = useState('');
  const [title, setTitle]:any[] = useState('');
  const router = useRouter(); 
  useEffect(() => {
    setTitle(atob(id));
    asyncStorage.getItem(atob(id))
    .then(setData)
    .catch(() => console.log('Fail to load data in /edit/[id]'));
  }, []);
  return (
    <MainContainer title='Home'>
        <View style={styles.menu}>
            <Text style={styles.titleInput}>{title}</Text>
            <TouchableHighlight 
                style={styles.saveButton}
                onPress={() => {
                    asyncStorage.setItem(title, data)
                    .then(() => router.back())
                    .catch(() => Alert.prompt('Error!', `falha ao persistir ${title}`));
                }}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableHighlight>
       </View >
       <TextField text={data} onChangeText={setData}/>
    </MainContainer>
  );
}

