import {SectionList, StatusBar, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  item: {
    borderColor: "black",
    borderWidth: 6,
    borderRadius: 10,
    backgroundColor: 'darkgray',
  },
  itemText:{
    color: 'black'
  }
});

type ItemProps = {
        title: string,
        platform: string,
        metacritic: number,
};

export default function Item({title, platform, metacritic}: ItemProps)
{
    return(
        <View style={styles.item}>
            <Text style={styles.itemText}>Game: {title}</Text >
            <Text style={styles.itemText}>platform: {platform}</Text >
            <Text style={styles.itemText}>metacritic: {metacritic}</Text >
        </View >
    )
}
