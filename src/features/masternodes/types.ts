export interface Masternode {
  address: string;
  coin: string;
  id: string;
  lastReward: {
    createdAt: string;
    amount: {
      coin: string;
      kind: 'NATIVE';
      amount: string;
    };
  };
  createdAt: string;
  status: 'ACTIVE' | 'AWAITING_FIRST_REWARD';
  type: 'DEFAULT' | '10_YEAR_FREEZER' | '5_YEAR_FREEZER';
}
