import React from "react";
import { useOutletContext } from "react-router";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { loadProduct, loadSellerProduct } from "../../utils/ProductLoader";

interface Props {
  setActiveTab?: (tab: string) => void;
  productId?: number;
  isEditing?: boolean;
  setShouldRefreshProducts: (shouldRefresh: boolean) => void;
  setShow?: (show: boolean) => void;
}

const ProductManager = ({
  setActiveTab = () => {},
  productId = -1,
  isEditing = false,
  setShouldRefreshProducts,
  setShow = () => {},
}: Props) => {
  const navigate = useNavigate();

  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("1.00");
  const [productImageUrl, setProductImageUrl] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState(1);

  // If productId is not -1, fetch product data from API
  if (productId !== -1) {
    // Fetch product data from API
    React.useEffect(() => {
      loadSellerProduct(productId, token)
        .then((res) => {
          setProductName(res.name);
          setProductDescription(res.description);
          setProductPrice(res.price);
          setProductImageUrl(res.image);
          setProductQuantity(res.inventory);
        })
        .catch((err) => {
          alert(
            "There was an error fetching your product. Please try again later."
          );
        });
    }, []);
  }

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing) {
      return handleEditProduct(e);
    }

    let form = new FormData();
    form.append("token", token);
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("description", productDescription);
    form.append("image_id", productImageUrl);
    form.append("inventory", productQuantity.toString());
    Axios.post("http://127.0.0.1:8000/products/add", form)
      .then((res) => {
        setShouldRefreshProducts(true);
        setActiveTab("dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = new FormData();
    form.append("token", token);
    form.append("product_id", productId.toString());
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("description", productDescription);
    form.append("image_id", productImageUrl);
    form.append("inventory", productQuantity.toString());
    Axios.post("http://127.0.0.1:8000/seller/products/edit", form)
      .then((res) => {
        setShow(false);
        setShouldRefreshProducts(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="col-lg-6" onSubmit={(e) => handleAddProduct(e)}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Product Name"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          maxLength={50}
          minLength={3}
          pattern="[A-Za-z0-9 ]+"
        />
        <label htmlFor="floatingInput">Product Name</label>
        <small>
          Product names must be <strong>3 to 50 characters</strong> in length,
          consisting only of <strong>letters, numbers, and spaces</strong>.
        </small>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Provide a meaningful description of your product."
          id="floatingTextarea2"
          maxLength={200}
          style={{ height: "160px" }}
          required
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
        ></textarea>
        <label htmlFor="floatingTextarea2">Product Description</label>
        <small>
          Product descriptions must be <strong>200 characters</strong> or less.
        </small>
      </div>
      <hr />
      <div className="form-floating mb-3">
        <input
          type="number"
          min="0.01"
          step="any"
          className="form-control"
          id="floatingInput"
          placeholder="Product Price"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <label htmlFor="floatingInput">Product Price ($)</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Product Image"
          required
          pattern="https?://.+"
          onChange={(e) => setProductImageUrl(e.target.value)}
          value={productImageUrl}
        />
        <label htmlFor="floatingInput">Product Image URL</label>
        <small>
          Product images must be <strong>URLs</strong> to images hosted on the
          web.
        </small>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          id="floatingInput"
          placeholder="Product Quantity"
          required
          onChange={(e) => setProductQuantity(parseInt(e.target.value))}
          value={productQuantity}
        />
        <label htmlFor="floatingInput">Stock Quantity</label>
        <small>
          Stock quantities must be <strong>whole numbers</strong> greater than
          zero.
        </small>
      </div>
      {isEditing ? (
        <button type="submit" className="btn btn-primary btn-block">
          Update Product
        </button>
      ) : (
        <button type="submit" className="btn btn-primary btn-block">
          Submit for Review
        </button>
      )}
    </form>
  );
};

export default ProductManager;
