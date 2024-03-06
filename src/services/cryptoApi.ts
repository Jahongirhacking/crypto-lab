import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Note the addition of "/react" at the end

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "98b43d4adcmsh4079f4d0f73b95ep12f600jsnc089a128a565",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ count, offset }) =>
        createRequest(`/coins?limit=${count}&offset=${offset}`),
    }),
    getCryptoDetails: builder.query({
      query: (id) => createRequest(`/coin/${id}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ id, timePeriod }) =>
        createRequest(`/coin/${id}/history?timePeriod=${timePeriod}`),
    }),
    getStats: builder.query({
      query: () => createRequest(`/coins?limit=1`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetStatsQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
