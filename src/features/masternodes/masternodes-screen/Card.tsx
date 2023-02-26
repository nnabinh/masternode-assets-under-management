import {Image, StyleSheet, Text, View} from 'react-native';
import {roundNumber} from '../../../utils/formatNumber';

interface CardProps {
  cmcId: string;
  coinName: string;
  coinSymbol: string;
  currencyValue: number;
  totalAUM: number;
  currency: {
    name: string;
    value: number;
  };
}

export default function Card({
  cmcId,
  coinName,
  coinSymbol,
  currency,
  currencyValue,
  totalAUM,
}: CardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${cmcId}.png`,
          }}
          style={styles.logo}
        />
        <Text style={styles.coinName}>{coinName}</Text>
        <Text style={styles.coinSymbol}>({coinSymbol})</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.body}>
        <View>
          <Text style={styles.bodyTitle}>
            {currency.name} value of all active assets:{' '}
          </Text>
          <Text>
            {roundNumber(currencyValue * currency.value)} {currency.name}
          </Text>
        </View>
        <View style={styles.bodySeparator} />
        <View>
          <Text style={styles.bodyTitle}>
            Total AUM (assets under management):{' '}
          </Text>
          <Text>
            {roundNumber(totalAUM)} {coinSymbol}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 1,
    width: '100%',
  },
  logo: {
    width: 24,
    height: 24,
  },
  coinName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  coinSymbol: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  body: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  bodyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bodySeparator: {
    height: 16,
    width: '100%',
  },
});
