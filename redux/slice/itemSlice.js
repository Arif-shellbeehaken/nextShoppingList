
import { shoppingApi } from '../../redux/services/shoppingApi';
export const config = {
  api: {
      bodyParser: false,
  },
}
export const itemApiSlice = shoppingApi.injectEndpoints({

  endpoints: (builder) => ({
    // get items api call
    getItems: builder.query({
      query: () => '/api/home',
      providesTags: ['Item'],
    }),
    // get item api call
    getItem: builder.query({
      query: (itemId) => `/api/items/${itemId}`,
      providesTags: ['Item'],
    }),
    // add api cal
    addItem: builder.mutation({
      query: (formData) => ({
        url: '/api/items',
        method: 'POST',
        body: {
          ...formData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg._id }],
    }),
    // update api call
    updateItem: builder.mutation({
      query: ({formData, itemId}) => ({
        url: `/api/items?itemId=${itemId}`,
        method: 'PUT',
        body: { 
           ...formData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg._id }],
    }),

    // delete api call
    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: `/api/items/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg._id }],
    }),

    // like dislike api call
    likeDislike: builder.mutation({
      query: ({id, email}) => ({
        url: `/api/items/${id}/likeDislikes`,
        method: 'PUT',
        body: { id, email }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg._id }],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useLikeDislikeMutation,
} = itemApiSlice;
