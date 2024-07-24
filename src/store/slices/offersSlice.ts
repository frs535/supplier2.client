import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GoodsType, ProposalType} from "../../pages/proposal/types.ts";
import {calcProposal, calcProposalRow} from "../../helpers/utils.ts";

export type proporsalAmountsType = {
    itemsSubtotal: number,
    discount: number,
    tax: number,
    subtotal: number,
}

export interface OffersState {
    proposal: ProposalType| null,
    cart: GoodsType[],
    proposalAmounts: proporsalAmountsType,
}

const initialState : OffersState = {
    proposal: null,
    cart: [],
    proposalAmounts: {
        itemsSubtotal: 0,
        discount: 0,
        tax: 0,
        subtotal: 0,
    },
}

const offersSlice = createSlice({
    name: "offers",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<GoodsType[]>) => {
            state.cart = action.payload;
            state.proposalAmounts = calcProposal(state.cart, state.proposal?.includesVAT|| true);
        },
        setRowQuantity: (state, action: PayloadAction<{quantity: number, id: string}>) => {
            const row = state.cart.find((item) => item._id === action.payload.id);
            if (row){
                row.quantity = action.payload.quantity;
                calcProposalRow(row, state.proposal?.includesVAT|| true);
                state.proposalAmounts = calcProposal(state.cart, state.proposal?.includesVAT|| true);
            }
        },
        removeCart: (state, action: PayloadAction<string>) => {
            const row = state.cart.find((item) => item._id === action.payload);
            if (row) {
                const index = state.cart.indexOf(row);
                if (index > -1) {
                    state.cart.splice(index, 1);
                    state.proposalAmounts = calcProposal(state.cart, state.proposal?.includesVAT|| true);
                }
            }
        },
        setProposal: (state, action: PayloadAction<ProposalType>) => {
            state.proposal = action.payload;
        }
    }
})

export const { setCart, setRowQuantity, setProposal, removeCart } = offersSlice.actions;

export default offersSlice;