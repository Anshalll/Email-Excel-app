import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'; // Import from react

export const Formmutations = createApi({
    reducerPath: "formmutations",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    
    endpoints: (builder) => ({
        uploadToExcel: builder.mutation({
            query: ({ path, data, method }) => ({
                url: path,
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
                body: JSON.stringify(data)
            }),
        }),
    }),
});


export const { useUploadToExcelMutation } = Formmutations;
export const FormmutationsReducer = Formmutations.reducer
