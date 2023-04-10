// This component fetches the product by a passed in id. It is a wrapper for ProductCard
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Axios from "axios";

interface Props {
  productId: number;
}

const ProductCardFetcher = ({ productId }: Props) => {
  const [product, setProduct] = useState(Object);

  useEffect(() => {
    Axios.get(`/products/${productId}`)
      .then((response) => {
        setProduct(response.data.products[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  return <>{product.name && <ProductCard {...product} />}</>;
};

export default ProductCardFetcher;
