import {FlatList, StatusBar, StyleSheet, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Link, Stack} from 'expo-router';
import colors from '@/constants/colors';
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        flex: 2,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 20,
    },
    itemContainer:{
        borderColor:'blak',
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    itemContainerText:{
        fontSize: 24   
    },
    notEmpty:{
        alignItems: 'center',
        justifyContent: 'center',
            gap: 20,
    },
    notEmptyText:{
        fontSize: 24
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
    return (
        <View style={styles.itemContainer}>
            <Link href={`/edit/[${atob(title)}]`}>
                <Text style={styles.itemContainerText}>{title}</Text >
            </Link>
        </View>
    );
};

export default function index({data}:props)
{
    
    return (
    <View style={styles.container}>
        {
            data && data.length > 0 ? 
                (<FlatList data={data} renderItem={({item}) => Item(item)} />)
                : (<View style={styles.notEmpty}>
                    <Icon name={'data-array'} color={colors.secundary} size={80}></Icon >
                    <Text style={styles.notEmptyText}>No content found</Text >
                  </View>)
        }
    </View>);
}

