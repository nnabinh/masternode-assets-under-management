import {CMC_API_BASE, CMC_API_KEY} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {QuoteLatest} from './types';

// Define a service using a base URL and expected endpoints
const cmcService = createApi({
  reducerPath: 'cmcApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CMC_API_BASE,
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_KEY,
    },
  }),
  endpoints: builder => ({
    getLatest: builder.query<{data: {[id: string]: QuoteLatest}}, string[]>({
      query: (slugs: string[]) =>
        `v2/cryptocurrency/quotes/latest?slug=${slugs.join(',')}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetLatestQuery} = cmcService;

export default cmcService;
