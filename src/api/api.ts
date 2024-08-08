import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {Category, ProductType} from "@frs535/react-ui-components";
import {ProposalType} from "../pages/proposal/types.ts";
import {ConfigState} from "../store/config.ts";

const baseQuery = retry(fetchBaseQuery({
    //baseUrl: `${window.location.protocol}//${window.location.hostname}:${window.location.port === "3000"? import.meta.env.BASE_PORT: window.location.port}/api`,
    baseUrl:  import.meta.env.VITE_BASE_URL? import.meta.env.VITE_BASE_URL: "api/v1/",//import.meta.env.DEV ? "http://localhost:5001/api/v1/": "api/v1/",
    prepareHeaders: (headers, { getState })=>{
        const state = getState() as ConfigState;
        if (state){
            headers.set('Authorization', `Bearer ${state.offers.token}`)
            headers.set('accept', 'application/json')
            headers.set('Content-type','application/json')
            //headers.set('Access-Control-Allow-Origin', '*')
            return headers
        }
    }
}), {maxRetries:5});

export const offerApi = createApi({
    baseQuery: baseQuery,
    reducerPath: "offerApi",
    tagTypes: [
        "Product",
        "Category",
        "Images",
        "Proposal"
    ],
    endpoints: (build) => ({

        getProduct: build.query<ProductType, string>({
            query: (id) =>({
                url: `product/product/${id}`,
                method: "GET",
                //params: { id }
            }),
            providesTags: ["Product"],
        }),

        getProductImages: build.query({
            query: ({id})=>({
                url: `/images/${id}/product`,
                method: "GET",
                params: {id, type: "product"}
            }),
            providesTags: ["Images"],
        }),

        getCategory: build.query<Category[], void>({
            query: ()=>({
                url: `/product/category`,
                method: "GET",
            }),
            providesTags: ["Category"],
            // async queryFn(_args, _queryapi, _extraoptions, _fetchwithbq){
            //
            //     const catigories = await _fetchwithbq('/product/category');
            //     if (catigories.error)
            //     return { error: catigories.error as FetchBaseQueryError }
            //
            //    return {data: catigories.data as Category[]};
            // },
        }),

        getProposal: build.query<ProposalType, string>({
            query: (id) => ({
                url: `/client/proposal/${id}`,
                method: "GET",
            }),
            providesTags: ['Proposal'],
        }),

        createProposal: build.mutation<void, ProposalType>({
            query: (body) => ({
                url: "/client/newproposal",
                method: "post",
                body: JSON.stringify(body),
            }),
        }),

    })
})

export const {
    useGetCategoryQuery,
    useGetProposalQuery,
    useCreateProposalMutation,
    useGetProductQuery,
} = offerApi