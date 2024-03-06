import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Note the addition of "/react" at the end

const apiKey = "d7de7bed8ff04ae2aebca24b8fc18937";

const baseUrl = "https://newsapi.org/v2";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ cryptoCategory }) => ({
        url: `everything?apiKey=${apiKey}&q=${cryptoCategory}&language=en`,
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
