import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PieChart as RNPieChart} from 'react-native-chart-kit';

interface PieChartProps {
  data: {
    name: string;
    amount: number;
    color: string;
  }[];
}

const PieChart = ({data}: PieChartProps) => {
  return (
    <View style={styles.container}>
      <RNPieChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});

export default PieChart;
