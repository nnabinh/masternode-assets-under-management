import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Container from '../../../components/Container';
import Loading from '../../../components/Loading';
import {COIN_COLOR_HASH, HOLDING_CAP_PER_NODE} from '../../../constants';
import {roundNumber} from '../../../utils/formatter';
// import {roundNumber} from '../../../utils/formatter';
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
        totalAUM={
          item.numberOfMasternodes *
          HOLDING_CAP_PER_NODE[item.coin] *
          cmcLatestData[item.coin].price
        }
      />
    ),
    [currency, cmcLatestData],
  );

  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        <SelectCurrency onChange={_currency => setCurrency(_currency)} />
        {masternodesData?.length && cmcLatestData && (
          <PieChart
            currency={currency}
            data={masternodesData
              .filter(data => cmcLatestData[data.coin])
              .map(data => ({
                name: data.coin,
                amount: roundNumber(
                  data.numberOfMasternodes *
                    HOLDING_CAP_PER_NODE[data.coin] *
                    cmcLatestData[data.coin].price,
                ),
                color: COIN_COLOR_HASH[data.coin],
              }))}
          />
        )}
      </>
    );
  }, [masternodesData, cmcLatestData, currency]);

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
