import {FlatList, StatusBar, StyleSheet, View, Text, Pressable } from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Link} from 'expo-router';
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
        justifyContent: 'space-between',

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
    title:string,
    deleteItem: (item: string) => Promise<string | void | null>
};
type props = {
    data: string[],
    deleteItem: (item: string) => Promise<string | void | null>
};
function Item({title, deleteItem}: ItemProps)
{   
    return (
        <View style={styles.itemContainer}>
            <Link href={`/edit/${btoa(title)}`}>
                <Text style={styles.itemContainerText}>{title}</Text >
            </Link>
            <Pressable testID={'delete-'+title} onPress={() => deleteItem(title)}>
                <MaterialCommunityIcons name={'trash-can'} color={colors.secundary} size={40}/>
            </Pressable>
        </View>
    );
};

export default function index({data, deleteItem}:props)
{
    let items = data.map((e: string) => ({title: e, deleteItem}));
    return (
    <View style={styles.container}>
        {
            data && data.length > 0 ? 
                (<FlatList data={items} renderItem={({item}) => Item(item)} />)
                : (<View style={styles.notEmpty}>
                    <MaterialIcon name={'data-array'} color={colors.secundary} size={80}/>
                    <Text style={styles.notEmptyText}>No content found</Text >
                  </View>)
        }
    </View>);
}

