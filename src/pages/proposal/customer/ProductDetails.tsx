import {
    PageBreadcrumb, PageBreadcrumbItemType,
    ProductType, ProductDescription, ProductDetailsTab,
    ProductReviewType,
    Section, SimilarProducts,
    SuggestedProductType,
    SpecificationType
} from "@frs535/react-ui-components";
import {useParams} from "react-router-dom";
import {useGetProductQuery} from "../../../api/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {ConfigState} from "../../../store/config.ts";
import {GoodsType} from "../types.ts";
import {useState} from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
// Import Swiper styles
import 'swiper/css';
import {setCartCustomerComment, setRowQuantity} from "../../../store/slices/offersSlice.ts";

const ProductDetails = () => {

    const {id, variantId} = useParams();
    const {data:product, isLoading, isError, error} = useGetProductQuery(id);
    const cart = useSelector((state:ConfigState)=> state.offers.cart);
    const row = cart.find((item: GoodsType)=>item.product.id === id && item.characteristic.id === variantId);
    const [quantity, setQuantity] = useState(row? row.quantity: 0);
    const specifications: SpecificationType = [] as SpecificationType[];
    const additionInfo: SpecificationType = null;
    const [comment, setComment] = useState(row?.customerComment);

    const dispatch = useDispatch();

    if(isLoading)
        return (<div>Loading...</div>);

    if (isError)
        return (<div>{error}</div>);

    console.log(id);

    const ecomBreadcrumbItems =[] as PageBreadcrumbItemType[];
    const similarProducts = [] as ProductType[];
    const suggestedProducts = [] as SuggestedProductType[];
    const productReviews = [] as ProductReviewType[];
    const productImage = product && product.images.length>0? product.images[0].url512 : "";

  return (
    <div className="pt-5 mb-9">
      <Section small className="py-0">
        <PageBreadcrumb items={ecomBreadcrumbItems} className="mb-3" />
        <ProductDescription characteristicVariants={product?.variants}
                            selectedVariantId={variantId}
                            product={product}
                            orderedQuantity={quantity}
                            images={product.images.map((row)=> `/${row.url512}`)}
                            sallerCommentary={row?.comment}
                            onQuantityChange={(value)=> {
                                setQuantity(value);
                                if (row)
                                    dispatch(setRowQuantity({quantity: value as number, id: row._id}));
                            }}
        />
      </Section>

      <Section small className="py-0">
        <div className="mb-9">
          <ProductDetailsTab productReviews={productReviews}
                             suggestedProducts={suggestedProducts}
                             productImage={productImage}
                             specifications={specifications}
                             additionInfo={additionInfo}
                             description={product?.description? product?.description: ""}
                             rated={product.rated? product.rated: 0}
                             rating={product.rating}
          />
        </div>
      </Section>

        <Section small className="py-0">
            <FloatingLabel controlId="floatingTextarea2" label="Комментарий">
                <Form.Control
                    as="textarea"
                    placeholder="Оставьте тут ваш комментарий"
                    style={{ height: '100px' }}
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                        if (row)
                            dispatch(setCartCustomerComment({comment: e.target.value as string, id: row._id}));
                    }}
                />
            </FloatingLabel>
        </Section>

      <Section className="py-0">
        <SimilarProducts products={similarProducts} />
      </Section>
    </div>
  );
};

export default ProductDetails;
