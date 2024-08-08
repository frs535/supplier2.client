import { Col, Row } from 'react-bootstrap';
import {
  Section,
  PageBreadcrumb,
  SummaryCard,
  PageBreadcrumbItemType,
  QuestionModal,
  AlertModal
} from "@frs535/react-ui-components";
import ProposalTable from "../../../components/tables/ProposalTable";
import {useParams} from "react-router-dom";
import {useCreateProposalMutation, useGetProposalQuery} from "../../../api/api.ts";
import {copyRowGoods} from "../../../helpers/utils.ts";
import {useDispatch, useSelector} from "react-redux";
import {ConfigState} from "../../../store/config.ts";
import {setCart, setProposal, setToken} from "../../../store/slices/offersSlice.ts";
import {useState} from "react";
import {ProposalType} from "../types.ts";

const Cart = () => {

  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  let { id } = useParams();
  if (!id) id="";

  const dispatch = useDispatch();

  const {data: proposal, isLoading} = useGetProposalQuery(id);
  const [createProposal] = useCreateProposalMutation();

  const proposalAmounts = useSelector((state: ConfigState)=>state.offers.proposalAmounts);
  const cart = useSelector((state: ConfigState)=>state.offers.cart);

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  if (!proposal)
    return (<div>Not found proposal...</div>)

  dispatch(setProposal(proposal));
  // @ts-ignore
  dispatch(setToken(proposal.auth.token));

  const breadcrumbItems: PageBreadcrumbItemType[] =[];

  if (cart.length===0)
  {
    const goods = proposal.goods.map((row)=> copyRowGoods(row));
    dispatch(setCart(goods));
  }

  const submitProposal =  () => {

    const newProposal: ProposalType = {
      id: "",
      linkId: "",
      basedOn: proposal.id,
      number: proposal.number,
      date: new Date(),
      direction: "out",
      manager: proposal.manager,
      customer: proposal.customer,
      contact: proposal.contact,
      expirationTo: proposal.expirationTo,
      currency: proposal.currency,
      purchaseOfAllProducts: proposal.purchaseOfAllProducts,
      paymentTerms: proposal.paymentTerms,
      termsOfDelivery: proposal.termsOfDelivery,
      other: proposal.other,
      includesVAT: proposal.includesVAT,
      customerInformation: proposal.customerInformation,
      goods: cart,
    }

    console.log(newProposal);
    console.log(JSON.stringify(newProposal));
    createProposal(newProposal);
  }

  return (
    <div className="pt-5 mb-9">
      <Section small className="py-0">
        <PageBreadcrumb items={breadcrumbItems} />
        <h2 className="mb-6">Предложение</h2>
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
                         onProceed={()=>{setOpenQuestionModal(true)}} />
          </Col>
        </Row>
      </Section>
      <QuestionModal handleClose={() => setOpenQuestionModal(false)}
                     handleSubmit={()=>{
                       submitProposal();
                       setOpenQuestionModal(false);
                       setOpenAlertModal(true);
                     }}
                     question="Подтвердить предложение?"
                     show={openQuestionModal}/>
      <AlertModal handleClose={()=>setOpenAlertModal(false)}
                  handleSubmit={()=>setOpenAlertModal(false)}
                  message="Предложение отправлено"
                  show={openAlertModal}/>
    </div>
  );
};

export default Cart;
