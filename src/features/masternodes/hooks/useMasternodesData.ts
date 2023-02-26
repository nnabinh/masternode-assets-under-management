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
    const activeDashNodes: Masternode[] = [];
    const activeDeFiChainNodes: Masternode[] = [];

    data?.forEach(node => {
      if (node.status === 'ACTIVE') {
        if (node.coin === 'Dash') {
          activeDashNodes.push(node);
        }
        if (node.coin === 'DeFi') {
          activeDeFiChainNodes.push(node);
        }
      }
    });

    return [
      ...(activeDashNodes.length
        ? [
            {
              coin: activeDashNodes[0].lastReward.amount.coin,
              amount: sumValues(activeDashNodes),
            },
          ]
        : []),
      ...(activeDeFiChainNodes.length
        ? [
            {
              coin: activeDeFiChainNodes[0].lastReward.amount.coin,
              amount: sumValues(activeDeFiChainNodes),
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
