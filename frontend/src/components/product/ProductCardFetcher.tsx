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
    Axios.get(`http://127.0.0.1:8000/products?id=${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  return (
    <>{product.name && <ProductCard image={product.image_id} {...product} />}</>
  );
};

export default ProductCardFetcher;
