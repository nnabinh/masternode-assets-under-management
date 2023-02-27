import {useMemo} from 'react';
import {useGetMasternodesQuery} from '../service';
import {Masternode} from '../types';

function sumValues(list: Masternode[]): number {
  return list.reduce((acc: number, obj: Masternode) => {
    return acc + (+obj.lastReward?.amount?.amount || 0);
  }, 0);
}

const useMasternodesData = () => {
  const {data, isLoading} = useGetMasternodesQuery({});

  const classifiedData = useMemo(() => {
    const dashNodes: Masternode[] = [];
    const activeDashNodes: Masternode[] = [];
    const deFiChainNodes: Masternode[] = [];
    const activeDeFiChainNodes: Masternode[] = [];

    data?.forEach(node => {
      if (node.coin === 'Dash') {
        if (node.status === 'ACTIVE') {
          activeDashNodes.push(node);
        }
        dashNodes.push(node);
      }
      if (node.coin === 'DeFi') {
        if (node.status === 'ACTIVE') {
          activeDeFiChainNodes.push(node);
        }
        deFiChainNodes.push(node);
      }
    });

    return [
      ...(activeDashNodes.length
        ? [
            {
              coin: activeDashNodes[0].lastReward.amount.coin,
              amount: sumValues(activeDashNodes),
              numberOfMasternodes: dashNodes.length,
            },
          ]
        : []),
      ...(activeDeFiChainNodes.length
        ? [
            {
              coin: activeDeFiChainNodes[0].lastReward.amount.coin,
              amount: sumValues(activeDeFiChainNodes),
              numberOfMasternodes: deFiChainNodes.length,
            },
          ]
        : []),
    ];
  }, [data]);

  return {
    data: classifiedData,
    isLoading,
  };
};

export default useMasternodesData;
