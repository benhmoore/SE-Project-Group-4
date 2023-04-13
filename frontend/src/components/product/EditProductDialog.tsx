import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import { loadProduct } from "../../utils/ProductLoader";
import ProductManager from "./ProductManager";

interface Props {
  productId: number;
  show: boolean;
  setShow: (show: boolean) => void;
}

const EditProductDialog = ({ productId, show, setShow }: Props) => {
  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const handleClose = () => {
    setShow(false);
  };

  const handleButton = () => {
    setShow(false);
  };

  // use loadProduct from ProductLoader.tsx to load product data
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);

  // Load product data from API
  useEffect(() => {
    loadProduct(productId, token)
      .then((res) => {
        console.log("RES: ", res);
        setProductName(res.name);
        setProductDescription(res.description);
        setProductPrice(res.price);
        setProductQuantity(res.inventory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShow = () => setShow(true);

  return (
    <Modal
      centered
      scrollable
      size="lg"
      show={show}
      onHide={handleClose}
      onShow={handleShow}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Product "{productName}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductManager productId={productId} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductDialog;
