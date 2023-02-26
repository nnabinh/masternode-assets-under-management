import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Container from '../../../components/Container';
import Loading from '../../../components/Loading';
import {COIN_COLOR_HASH} from '../../../constants';
import {roundNumber} from '../../../utils/formatNumber';
import useCMCLatestData from '../../cmc/hooks/useCMCLatestData';
import useMasternodesData from '../hooks/useMasternodesData';
import Card from './Card';
import PieChart from './PieChart';
import SelectCurrency from './SelectCurrency';

export default function MasternodesScreen() {
  const [currency, setCurrency] = useState({name: 'USD', value: 1});
  const {data: masternodesData, isLoading: isMasternodesDataLoading} =
    useMasternodesData();
  const {data: cmcLatestData, isLoading: isCMCLatestDataLoading} =
    useCMCLatestData();

  const keyExtractor = useCallback(
    (item: (typeof masternodesData)[0]) => item.coin,
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: (typeof masternodesData)[0]}) => (
      <Card
        cmcId={cmcLatestData[item.coin].cmcId}
        coinName={cmcLatestData[item.coin].cmcName}
        coinSymbol={cmcLatestData[item.coin].symbol}
        currencyValue={item.amount * cmcLatestData[item.coin].price}
        currency={currency}
        totalAUM={item.amount}
      />
    ),
    [currency, cmcLatestData],
  );

  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        <SelectCurrency onChange={_currency => setCurrency(_currency)} />
        <PieChart
          data={masternodesData.map(data => ({
            name: data.coin,
            amount: roundNumber(data.amount),
            color: COIN_COLOR_HASH[data.coin],
          }))}
        />
      </>
    );
  }, [masternodesData]);

  if (
    isMasternodesDataLoading ||
    isCMCLatestDataLoading ||
    !masternodesData?.length ||
    !cmcLatestData
  ) {
    return <Loading />;
  }

  return (
    <Container>
      <FlatList
        data={masternodesData}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
});
