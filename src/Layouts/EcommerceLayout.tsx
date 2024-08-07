import { Outlet } from 'react-router-dom';
import {
    ChatWidget,
    EcommerceFooter,
    EcommerceNavbar,
    EcommerceTopbar, Footer,
    useSettingsMountEffect
} from "@frs535/react-ui-components";
import {useGetCategoryQuery} from "../api/api";
import {useSelector} from "react-redux";
import {ConfigState} from "../store/config.ts";

const EcommerceLayout = () => {
  useSettingsMountEffect({
    disableNavigationType: true,
    disableHorizontalNavbarAppearance: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true
  });

    const cart = useSelector((state:ConfigState)=> state.offers.cart);

    const {data, isLoading} = useGetCategoryQuery()

    if (isLoading)
        return (<div/>);

  return (
    <>
      <EcommerceTopbar cartItems={cart.length} />
      <div className="position-relative">
          {data && <EcommerceNavbar categories={data}/>}
        <Outlet />
      </div>
      <EcommerceFooter description={"Description"} ecommerceFooters={[]} />
      <Footer />
      <ChatWidget />
    </>
  );
};

export default EcommerceLayout;
