import { Col, Row } from 'react-bootstrap';
import {Section, PageBreadcrumb, SummaryCard} from "@frs535/react-ui-components";
import ProposalTable from "../../../components/tables/ProposalTable";
import {PageBreadcrumbItem} from "@frs535/react-ui-components/dist/cjs/types/components/common/PageBreadcrumb";
import {useParams} from "react-router-dom";
import {useGetProporsalQuery} from "../../../api/api.ts";
import {copyRowGoods} from "../../../helpers/utils.ts";
import {useDispatch, useSelector} from "react-redux";
import {ConfigState} from "../../../store/config.ts";
import {setCart, setProposal} from "../../../store/slices/offersSlice.ts";

const Cart = () => {

  let { id } = useParams();
  if (!id) id="";

  const dispatch = useDispatch();

  const {data: proposal, isLoading} = useGetProporsalQuery(id);

  const proposalAmounts = useSelector((state: ConfigState)=>state.offers.proposalAmounts);
  const cart = useSelector((state: ConfigState)=>state.offers.cart);

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  if (!proposal)
    return (<div>Not found proposal...</div>)

  dispatch(setProposal(proposal));

  const breadcrumbItems: PageBreadcrumbItem[] =[];

  if (cart.length===0)
  {
    const goods = proposal.goods.map((row)=> copyRowGoods(row));
    dispatch(setCart(goods));
  }

  return (
    <div className="pt-5 mb-9">
      <Section small className="py-0">
        <PageBreadcrumb items={breadcrumbItems} />
        <h2 className="mb-6">Коммерческое предложение</h2>
        <Row className="g-5">
          <Col xs={12} lg={8}>
            {proposal && (<ProposalTable/>
            )}
          </Col>
          <Col xs={12} lg={4}>
            <SummaryCard itemsSubtotal={proposalAmounts.itemsSubtotal}
                         discount={proposalAmounts.discount}
                         tax={proposalAmounts.tax}
                         subtotal={proposalAmounts.subtotal}
                         onProceed={(value)=>{console.log(value)}}/>
          </Col>
        </Row>
      </Section>
    </div>
  );
};

export default Cart;
