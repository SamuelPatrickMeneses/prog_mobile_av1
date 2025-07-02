import asyncStorage from "@react-native-async-storage/async-storage";

export function deleteItem(item: string): Promise<string| void | null>
{
    return asyncStorage.getItem('item-list')
    .then((l: string |null) =>{
        let list: string[] = JSON.parse(l ?? '[]');
        asyncStorage.removeItem(item);
        list = list.filter((e) => e !== item);
        asyncStorage.setItem('item-list', JSON.stringify( list))
        .then(() => console.log('item removed!'));
    });
}
