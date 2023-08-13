//! logic to fetch data from a API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// a API needs to have a reducerPath that is name of the api
export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',

  // All of our requests will have URLs starting with 'https://shazam.p.rapidapi.com'
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'd3c80d94fcmsh357ea28400a9948p1d6123jsn1e1bc154e0a8');

      return headers;
    },
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track' }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?&term=${searchTerm}`,
    }),
    // getSongDetails: builder.query({ query: ({ songid }) => '/charts/track' }),
  }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongsBySearchQuery } =
  shazamCoreApi;
