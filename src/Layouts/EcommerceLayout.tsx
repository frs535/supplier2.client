import { Outlet } from 'react-router-dom';
import {
    ChatWidget,
    EcommerceFooter,
    EcommerceNavbar,
    EcommerceTopbar, Footer,
    useSettingsMountEffect
} from "@frs535/react-ui-components";
import {useGetCategoryQuery} from "../api/api";

const EcommerceLayout = () => {
  useSettingsMountEffect({
    disableNavigationType: true,
    disableHorizontalNavbarAppearance: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true
  });

    const {data, isLoading} = useGetCategoryQuery()

    if (isLoading)
        return (<div/>);

  return (
    <>
      <EcommerceTopbar />
      <div className="position-relative">
          {data && <EcommerceNavbar categories={data}/>}
        <Outlet />
      </div>
      <EcommerceFooter />
      <Footer />
      <ChatWidget />
    </>
  );
};

export default EcommerceLayout;
