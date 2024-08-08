import {GoodsType} from "../pages/proposal/types.ts";

export const calcProposal: (goods: GoodsType[], includesVAT: boolean) => {
    itemsSubtotal: number,
    discount: number,
    tax: number,
    subtotal: number,
} = (goods, includesVAT)=> {

    //goods.map((row)=>calcProposalRow(row, includesVAT));

    const itemsSubtotal = goods.reduce((accumulator, row)=> accumulator + row.amount, 0);
    const tax = goods.reduce((accumulator, row)=> accumulator + row.amountTaxes, 0);

    return {
        itemsSubtotal,
        discount: goods.reduce((accumulator, row)=> accumulator + row.discountAmount, 0),
        tax: tax,
        subtotal: includesVAT ? itemsSubtotal : itemsSubtotal + tax
    }
}

export const calcProposalRow: (row: GoodsType, priceIncludesVAT: boolean)=> void = (row, priceIncludesVAT)=> {

    row.discountAmount = Math.round(row.quantity * row.price * row.discountPercent) / 100;

    const amount = row.quantity * row.price - row.discountAmount;

    let amountTaxes = 0;
    if (priceIncludesVAT)
        amountTaxes = amount - 100 * amount / (100 + row.tax.value)
    else
        amountTaxes = amount * row.tax.value/ 100;

    row.amountTaxes = Math.round(amountTaxes * 100) / 100;

    row.amount = priceIncludesVAT ? amount: amount + amountTaxes;
}

export const copyRowGoods: (row: GoodsType) => GoodsType = (row)=>{
    return {
        _id: row._id,
        lineNumber: row.lineNumber,
        product: {
            id: row.product.id,
            name: row.product.name,
            article: row.product.article,
        },
        characteristic: {
            id: row.characteristic.id,
            name: row.characteristic.name,
        },
        pack: {
            id: row.pack.id,
            name: row.pack.name,
        },
        deliveryDate: row.deliveryDate,
        quantity: row.quantity,
        price: row.price,
        discountPercent: row.discountPercent,
        discountAmount: row.discountAmount,
        amount: row.amount,
        tax: row.tax,
        amountTaxes: row.amountTaxes,
        comment: row.comment,
        customerComment: row.customerComment,
    }
};