import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import MainContainer from '../components/MainConstainer'
import RegistreList from '../components/RegistreList';
import {useEffect, useState} from 'react';
import asyncStorage from "@react-native-async-storage/async-storage";
import colors from '../constants/colors';
import {Link} from 'expo-router';

export default function App()
{
  const [data, setData]:any[] = useState([]);
  useEffect(() => {
    asyncStorage.getItem('item-list')
    .then((l) => {
        console.log(l);
        if (l !== null) {
            setData(JSON.parse(l));
        } else {
            setData([]);
        }
    })
  },[]);
  return (
    <MainContainer title='Home'>
        <View style={styles.menu}>
            <View style={styles.newButton}>
                <Link href={'/new'} ><Text style={styles.newButtonText}>new</Text ></Link >
            </View >
        </View >
        <RegistreList data={data.map((e: string) => ({'title': e}))} />
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
