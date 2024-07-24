
export type ProposalType = {
    id: number;
    number: string,
    date: Date,
    manager: {
        id: string,
        name: string,
        phone: string,
        email: string,
    },
    customer: {
        id: string,
        name: string,
    },
    contact: {
        id: string,
        name: string,
    },
    expirationTo: Date,
    currency: string,
    purchaseOfAllProducts: boolean,
    paymentTerms: string,
    termsOfDelivery: string,
    other: string,
    includesVAT: boolean,
    customerInformation: string,
    goods:GoodsType[]
}

export type GoodsType = {
    _id: string,
    lineNumber: number,
    product: {
        id: string,
        name: string,
    },
    characteristic: {
        id: string,
        name: string,
    },
    pack: {
        id: string,
        name: string,
    },
    deliveryDate: string,
    quantity: number,
    price: number,
    discountPercent: number,
    discountAmount: number,
    tax: {
        id: string,
        name: string,
        value: number,
    },
    amountTaxes: number,
    amount: number,
    comment: string,
}