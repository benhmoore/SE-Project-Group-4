import Axios from "axios";

// Loads a product given its id using Axios
export const loadProduct = async (id: number, token: string) => {
  const res = await Axios.get("http://127.0.0.1:8000/products", {
    params: {
      token,
      id,
    },
  });
  return res.data.products[0];
};

export const loadSellerProducts = async (token: string) => {
  const res = await Axios.get("http://127.0.0.1:8000/seller/products", {
    params: {
      token,
    },
  });
  return res.data.products;
};

export const loadSellerProduct = async (id: number, token: string) => {
  const res = await Axios.get("http://127.0.0.1:8000/seller/products", {
    params: {
      product_id: id,
      token,
    },
  });
  return res.data.products[0];
};
