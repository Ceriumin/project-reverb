import { View, StyleSheet } from 'react-native';
import { GraphWrapper } from '@components/_index';
import { processPlaytimeData } from '@utils/_index';

export default function HomeScreen() {

  const data = processPlaytimeData();

  return (
    <View style={styles.container}>
      <GraphWrapper title="Average" data={data} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});