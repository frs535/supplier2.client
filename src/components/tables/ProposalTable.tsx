import {currencyFormat, QuantityButtons, Scrollbar, Button} from "@frs535/react-ui-components";
import { Table } from 'react-bootstrap';
import {useMemo, useState} from "react";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {GoodsType} from "../../pages/proposal/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {removeCart, setRowQuantity} from "../../store/slices/offersSlice.ts";
import {ConfigState} from "../../store/config.ts";

const ProposalTable = () => {

    const proposalAmounts = useSelector((state: ConfigState)=>state.offers.proposalAmounts);
    const cart = useSelector((state: ConfigState)=>state.offers.cart);

    return (
        <Scrollbar autoHeight autoHeightMax="100%" className="table-scrollbar">
            <Table className="phoenix-table fs-9 mb-0 border-top border-translucent">
                <thead>
                <tr>
                    <th scope="col"/>
                    <th scope="col" style={{minWidth: 250}}>
                        Товар
                    </th>
                    {/*<th scope="col" style={{ width: 80 }}>*/}
                    {/*    Характеристика*/}
                    {/*</th>*/}
                    {/*<th scope="col" style={{width: 100}}>*/}
                    {/*    Срок поставки*/}
                    {/*</th>*/}
                    <th className="text-end" scope="col" style={{width: 100}}>
                        Цена
                    </th>
                    <th className="ps-5" scope="col" style={{width: 200}}>
                        Количество
                    </th>
                    <th className="ps-5" scope="col" style={{width: 200}}>
                        Скидка
                    </th>
                    <th className="text-end" scope="col" style={{width: 100}}>
                        Итого
                    </th>
                    <th className="text-end pe-0" scope="col"/>
                </tr>
                </thead>
                <tbody className="list" id="cart-table-body">
                {cart.map(product => (
                    <ProposalTableRow row={product}
                                      key={product._id}
                    />
                ))}

                <tr className="cart-table-row">
                    <td
                        className="text-body-emphasis fw-semibold ps-0 fs-8"
                        colSpan={5}
                    >
                        Под итог :
                    </td>
                    <td className="text-body-emphasis fw-bold text-end fs-8">{currencyFormat(proposalAmounts.subtotal)}</td>
                    <td />
                </tr>
                </tbody>
            </Table>
        </Scrollbar>
    );
};

const ProposalTableRow = ({ row }: { row: GoodsType}) => {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(row.quantity);

    const total = useMemo(() => {
        return row.amount;
    }, [quantity]);

    return (
        <tr className="cart-table-row" key={row._id}>
            <td className="py-0">
                <div className="border border-translucent rounded-2">
                    <img src={`/assets/${row.product.id}/256_256_product_1.jpg`} alt={row.product.name} width={53} />
                </div>
            </td>
            <td>
                <Link className="fw-semibold line-clamp-2" to={`/proposal/product-details/${row.product.id}/${row.characteristic.id}`}>
                    {`${row.product.name}(${row.characteristic.name})`}
                </Link>
            </td>
            {/*<td className="white-space-nowrap">{row.characteristic.name}</td>*/}
            {/*<td className="white-space-nowrap text-body-tertiary fw-semibold">*/}
            {/*    {'1970-01-01T00:00:00.000Z' === row.deliveryDate ? '-' : new Date(row.deliveryDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric' })}*/}
            {/*</td>*/}
            <td className="fw-semibold text-end">{currencyFormat(row.price)}</td>
            <td className="fs-8 ps-5">
                <QuantityButtons
                    type="secondary"
                    quantity={quantity}
                    setQuantity={(rowQuantity)=>{
                        dispatch(setRowQuantity({quantity: rowQuantity as number, id: row._id}));
                        setQuantity(rowQuantity);
                    }}
                />
            </td>
            <td className="fw-semibold text-end">{currencyFormat(row.discountAmount)}</td>
            <td className="fw-bold text-body-highlight text-end">
                {currencyFormat(total)}
            </td>
            <td className="text-end ps-3">
                <Button
                    size="sm"
                    variant="link"
                    className="text-body-quaternary text-body-tertiary-hover me-2"
                    onClick={()=>dispatch(removeCart(row._id))}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
            </td>
        </tr>
    );
};

export default ProposalTable;
