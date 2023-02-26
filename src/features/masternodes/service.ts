import {CAKE_DEFI_API_BASE} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Masternode} from './types';

// Define a service using a base URL and expected endpoints
const masternodesService = createApi({
  reducerPath: 'masternodesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CAKE_DEFI_API_BASE,
  }),
  endpoints: builder => ({
    getMasternodes: builder.query<Masternode[], {}>({
      query: () => 'nodes?order=status&orderBy=DESC',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetMasternodesQuery} = masternodesService;

export default masternodesService;
