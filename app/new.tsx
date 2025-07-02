import { StyleSheet, View, Text, ScrollView, Button, TouchableHighlight, TextInput, Alert } from 'react-native';
import MainContainer from '../components/MainConstainer'
import TextField from '../components/TextField'
import RegistreList from '../components/RegistreList';
import {useEffect, useState} from 'react';
import asyncStorage from "@react-native-async-storage/async-storage";
import colors from '../constants/colors';
import {Link, useRouter} from 'expo-router';

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
      flex: 1
  }
});

export default function App()
{
  const router = useRouter(); 
  const [data, setData]:any[] = useState('');
  const [title, setTitle]:any[] = useState('');
  const [list, setList]: any[] = useState([]);
  useEffect(() => {
    asyncStorage.getItem('item-list')
    .then((l: string | null) => setList(JSON.parse(l ?? '[]')))
    .catch(() => console.log('Fail to load data in index.tsx'));
  },[]);
  return (
    <MainContainer title='New'>
        <View style={styles.menu}>
            <TextInput testID='titleField' style={styles.titleInput} value={title} onChangeText={setTitle}/>
            <TouchableHighlight 
                style={styles.saveButton}
                onPress={() => {
                    if (list.findIndex((e : any) => e === title) === -1) {
                        asyncStorage.setItem(title, data)
                        .then(() =>{ 
                            list.push(title);
                            asyncStorage.setItem('item-list', JSON.stringify(list))
                            .then(() => console.log('lista gravada com suseso', list))
                            .catch(() => console.log('falha ao persistir dados em new.tsx'));
                            router.replace('/');
                        })
                        .catch(() => Alert.prompt('Error!', 'Este titulo ja existie!'));
                    }
                }}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableHighlight>
       </View >
       <TextField testID='textField' text={data} onChangeText={setData}/>
    </MainContainer>
  );
}

