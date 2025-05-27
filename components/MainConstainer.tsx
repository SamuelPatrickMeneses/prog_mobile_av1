import {SectionList, StatusBar, StyleSheet, View, Text, ViewProps } from 'react-native';

import { Stack} from 'expo-router';
const styles = StyleSheet.create({
    container:{
        flex: 1
    }        
});
type props = {
    title:string,
    
} & ViewProps;
export default function index({title, children}:props)
{ 
    return (<View style={styles.container}>
        <Stack.Screen options={{title}}/>
        <StatusBar 
            animated={true}
            hidden={false}
            backgroundColor={'blue'}
            barStyle={'light-content'}
            showHideTransition={'slide'}
        />
        {children}
    </View>);
}

