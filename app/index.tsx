import { StyleSheet, View, Text, ScrollView, Button, Pressable } from 'react-native';
import MainContainer from '../components/MainConstainer'
import RegistreList from '../components/RegistreList';
import {useEffect, useState} from 'react';
import asyncStorage from "@react-native-async-storage/async-storage";
import colors from '../constants/colors';
import {Link, useRouter} from 'expo-router';
import {deleteItem} from '../helpers/delete';
export default function App()
{
  const router = useRouter();
  const [data, setData]:any[] = useState([]);
  useEffect(() => {
    asyncStorage.getItem('item-list')
    .then((l: string | null) => setData(JSON.parse(l ?? '[]')));
  },[]);
  function delItem(i: string) {
    return deleteItem(i)
    .then(() => setData(data.filter((e:string) => e !== i)));
  }
  return (
    <MainContainer title='Home'>
        <View style={styles.menu}>
            <Pressable style={styles.newButton} onPress={() => router.replace('/new')}>
                <Text style={styles.newButtonText}>new</Text >
            </Pressable >
        </View >
        <RegistreList data={data} deleteItem={delItem}/>
    </MainContainer>
  );
}

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
    flex: 0
  },
  newButton:{
    borderRadius: 10,
    backgroundColor: 'chartreuse',
    color: colors.primary,
    padding: 10
  },
  newButtonText: {
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
  },
  list:{
    flex: 1
  }
});
