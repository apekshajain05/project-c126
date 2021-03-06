import { StatusBar } from 'expo-status-bar';
import {React,Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './screens/camera'

export default class App extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Camera/>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
