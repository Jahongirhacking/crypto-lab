import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Note the addition of "/react" at the end

const apiKey = "4bf0b44891b408c1b214c06f0137c13a";

const baseUrl = "https://gnews.io/api/v4/search";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ cryptoCategory }) => ({
        url: `?q=${cryptoCategory}&lang=en&apikey=${apiKey}`,
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
