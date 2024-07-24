import {createApi, fetchBaseQuery, FetchBaseQueryError, retry} from "@reduxjs/toolkit/query/react";
import {EcomState} from "../store/slices/ecomSlice.ts";
import {Category} from "@frs535/react-ui-components";
import {ProposalType} from "../pages/proposal/types.ts";


const baseQuery = retry(fetchBaseQuery({
    //baseUrl: `${window.location.protocol}//${window.location.hostname}:${window.location.port === "3000"? import.meta.env.BASE_PORT: window.location.port}/api`,
    baseUrl: 'https://api.supplier.deskit.ru/api/v1',
    prepareHeaders: (headers, { getState })=>{
        const state = getState() as EcomState;
        if (state){
            headers.set('Authorization', `Bearer ${state.ecom.token}`)
            headers.set('accept', 'application/json')
            headers.set('Content-type','application/json')
            return headers
        }
    }
}), {maxRetries:5});

export const clientApi = createApi({
    baseQuery: baseQuery,
    reducerPath: "clientApi",
    tagTypes: [
        "User",
        "Profile",
        "Product",
        "Category",
        "Dashboard",
        "Images",
        "Order",
        "Proposal"
    ],
    endpoints: (build) => ({
        getProfile: build.query({
            query: (id) => `general/profile/${id}`,
            providesTags: ["Profile"],
        }),
        getProducts: build.query({
            query: ({groupId}) => ({
                url: "client/products",
                method: "GET",
                params: {groupId}
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        getProduct: build.query({
            query: (id) =>({
                url: "client/product",
                method: "GET",
                params: { id }
            }),
            providesTags: ["Product"],
        }),

        getProductImages: build.query({
            query: ({id})=>({
                url: `/images/${id}/product`,
                method: "GET",
                params: {id, type: "product"}
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Images', id })), 'Images']
                    : ['Images'],
        }),

        // getCategory: build.query<Category[], number>({
        //     query: () => "product/category",
        //     providesTags: ["Category"],
        // }),
        getCategory: build.query<Category[], void>({
            async queryFn(_args, _queryapi, _extraoptions, _fetchwithbq){

                const catigories = await _fetchwithbq('/product/category');
                if (catigories.error)
                return { error: catigories.error as FetchBaseQueryError }

               return {data: catigories.data as Category[]};
            },
            // providesTags: (result) =>
            //     result
            //         ? [
            //             ...result.map(({ id }) => ({ type: 'Category', id: Id })),
            //             { type: 'Category', id: 'LIST' },
            //         ]
            //         : [{ type: 'Category', id: 'LIST' }],
        }),

        getProporsal: build.query<ProposalType, string>({
            query: (id) => ({
                url: `client/proposal/${id}`,
                method: "GET",
            }),
            providesTags: ['Proposal'],
        }),


        getOrders: build.query({
            query: ({ page, pageSize, sort })=>({
                url: `client/orders`,
                method: "GET",
                params: { page, pageSize, sort },
            }),
            providesTags: ['Order'],
        }),

        getOrder: build.query({
            query: (id) => ({
                url: `client/order/${id}`,
                method: "GET",
                params: {id: id}
            }),
            providesTags: ['Order'],
        }),

        updateOrder: build.mutation({
            query: ({order}) =>({
                url: `client/orders`,
                method: "POST",
                body: order
            }),
            invalidatesTags: (result) => [
                {type: "Order", id: `${result.id}_${result.updatedAt}`}
            ],
            providesTags: () => [
                {type: "Order", id: "ALL"}
            ],
        }),

        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
    })
})

export const {
    useLazyGetCategoryQuery,
    useGetCategoryQuery,
    useGetProporsalQuery,
    // useGetProfileQuery,
    // useGetProductsQuery,
    // useGetCategoryQuery,
    //
    // useGetDashboardQuery,
    // useGetProductImagesQuery,
    // useGetProductQuery,
    // useGetOrderQuery,
    // useGetOrdersQuery,
    // useUpdateOrderMutation,
} = clientApi