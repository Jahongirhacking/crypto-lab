import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Note the addition of "/react" at the end

const apiKey = process.env.NEWS_API_KEY;

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
