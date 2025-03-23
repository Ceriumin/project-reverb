import React from 'react';
import { View, StyleSheet } from 'react-native';
import GraphWrapper from '../../components/GraphWrapper';
import { processPlaytimeData } from '../../utils/session-data';

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