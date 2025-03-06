import React from 'react';
import { View, Text  } from 'react-native';
import GraphWrapper from '../components/GraphWrapper';
import { processPlaytimeData } from '../helpers/_index';


export default function HomeScreen() {

  const data = processPlaytimeData();

  return (
    <View>
      <GraphWrapper title="Average" data={data} type="bar" color="red" />
    </View>
  );
}