import {useMemo} from 'react';
import {useGetLatestQuery} from '../service';

interface SanitizedCMCData {
  [key: string]: {
    cmcId: string;
    cmcName: string;
    symbol: string;
    price: number;
  };
}

const useCMCLatestData = () => {
  const {data, isLoading} = useGetLatestQuery(['dash', 'defichain']);

  const classifiedData = useMemo(() => {
    return {
      ...(data?.data &&
        Object.values(data.data).reduce(
          (acc, obj) => ({
            ...acc,
            [obj.symbol]: {
              cmcId: obj.id,
              cmcName: obj.name,
              symbol: obj.symbol,
              price: obj.quote?.USD?.price,
            },
          }),
          {} as SanitizedCMCData,
        )),
    };
  }, [data]);

  return {
    data: classifiedData,
    isLoading,
  };
};

export default useCMCLatestData;
