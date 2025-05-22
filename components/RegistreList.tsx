import {FlatList, StatusBar, StyleSheet, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Entypo';
import { Stack} from 'expo-router';
import colors from '@/constants/colors';
const styles = StyleSheet.create({
    container:{
        
    },
    itemContainer:{
        borderColor:'black'
    }
});
type ItemProps = {
    title:string  
};
type props = {
    data: ItemProps[] 
};
function Item( {title}:ItemProps )
{
    return (<View style={styles.itemContainer}>
        <Text>{title}</Text>
    </View>);
};

export default function index({data}:props)
{

    return (
    <View style={styles.container}>
        {
            data && data.length > 0 ? 
                (<FlatList data={data} renderItem={({item}) => Item(item)}/>)
                : (<Icon name={'progress-empty'} color={colors.secundary}></Icon>)
        }
    </View>);
}

