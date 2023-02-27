import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PieChart as RNPieChart} from 'react-native-chart-kit';
import {formatPrice} from '../../../utils/formatter';

interface PieChartProps {
  data: {
    name: string;
    amount: number;
    color: string;
  }[];
  currency: {
    name: string;
    value: number;
  };
}

const PieChart = ({data, currency}: PieChartProps) => {
  return (
    <View style={styles.container}>
      <RNPieChart
        data={data}
        width={400}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 2,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="10"
        absolute
        hasLegend={false}
      />
      <View style={styles.legend}>
        {data.map(obj => (
          <View key={obj.name} style={styles.legendInfo}>
            <Text style={[styles.legendTitle, {color: obj.color}]}>
              {obj.name}
            </Text>
            <Text style={styles.legendValue}>
              {formatPrice(obj.amount * currency.value)} {currency.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  legend: {
    position: 'absolute',
    right: 20,
    top: 65,
  },
  legendInfo: {
    marginBottom: 8,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  legendValue: {
    fontSize: 14,
  },
});

export default PieChart;
