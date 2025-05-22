import {useEffect, useState} from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const hasAlpha = (text: string) => RegExp('.*[a-zA-Z].*').test(text);
const hasNumber = (text: string) => RegExp('.*[0-9].*').test(text);
const hasSpecial = (text: string) => RegExp('.*[!@#$%&*].*').test(text);
export default function ResetPassword() {
    const [pass, useP1] = useState("");
    const [confirm, useP2] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    useEffect(() => {
        setPasswordIsValid(
            hasAlpha(pass) 
            && hasNumber(pass) 
            && hasSpecial(pass)
            && pass === confirm
            && pass.length >= 6
        );  
    },[pass, confirm]);
    const onPress = () => console.log(` presed`);
    return (
      <View style={styles.container}  >
          <TextInput 
              style={styles.ti}
              value={pass}
              onChangeText={useP1}
              placeholder={'password'}
          />
          <TextInput 
              style={styles.ti}
              value={confirm}
              onChangeText={useP2}
              placeholder={'confirme password'}
          />
          <Button
              title={'confirme'}
              onPress={onPress}
              disabled={!passwordIsValid}
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
    gap: 20,
     
  },
  ti:{
      borderColor:'black',
      borderWidth: 1,
      width: 300
  },
  button: {
      width: 300
  }
});
