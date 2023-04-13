import Axios from "axios";

// Loads a product given its id using Axios
export const loadProduct = async (id: number, token: string) => {
  const res = await Axios.get("/products", {
    params: {
      token,
      id,
    },
  });
  return res.data.products[0];
};
