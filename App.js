import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from './app/Map/Map';

export default function App() {
  console.log("started app execution mothafacka")
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map />
    </View>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
