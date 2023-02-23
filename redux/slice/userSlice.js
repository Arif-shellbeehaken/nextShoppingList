
import { shoppingApi } from '../../redux/services/shoppingApi';

export const userApiSlice = shoppingApi.injectEndpoints({

  endpoints: (builder) => ({
    // get items api call
    getUsersInfo: builder.query({
      query: () => '/api/users',
      providesTags: ['User'],
    }),
    // get item api call
    getUserInfo: builder.query({
      query: (userId) => `/api/users/${userId}`,
      providesTags: ['User'],
    }),
    // add api cal
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: '/api/users/register',
        method: 'POST',
        body: {
          ...userInfo,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg._id }],
    }),

    // login user
    userLogin: builder.mutation({
      query: (loginInfo) => ({
          url: '/api/users/login',
          method: 'POST',
          body: { ...loginInfo },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg._id }],
  }),
    // update api call
    updateUserInfo: builder.mutation({
      query: ({userInfo, userId}) => ({
        url: `/api/users?userId=${userId}`,
        method: 'PUT',
        body: { 
           ...userInfo,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg._id }],
    }),

    // delete api call
    deleteUserInfo: builder.mutation({
      query: ({ id }) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg._id }],
    }),
  })
});

export const {
  useGetUsersInfoQuery,
  useGetUserInfoQuery,
  useRegisterUserMutation,
  useDeleteUserInfoMutation,
  useUpdateUserInfoMutation,
  useUserLoginMutation,
  // useItemLikeMutation
} = userApiSlice;
