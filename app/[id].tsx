import { Stack} from 'expo-router';
import {StatusBar, StyleSheet, View, Text, Button} from 'react-native';
import {useRouter, useSearchParams} from 'expo-router/build/hooks';


export default function App() {
  const [[_,id]] = useSearchParams();
  const router = useRouter();
  return (
    <View style={styles.container}  >
        <Stack.Screen options={{title: 'show id'}}/>
        <Text style={styles.text}>
            { id}
        </Text>
        <Button title='Home' onPress={() => router.back()}/>
        <StatusBar 
            animated={true}
            hidden={false}
            backgroundColor={'blue'}
            barStyle={'light-content'}
            showHideTransition={'slide'}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  text: {
    fontSize: 40
  }
});
