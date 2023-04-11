import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  title: string;
  message: string;
  confirmText: string;
  handleConfirm: () => void;
  handleCancel: () => void;
  show: boolean;
  setShow: (show: boolean) => void;
}

const Dialog = ({
  title,
  message,
  confirmText,
  handleConfirm,
  handleCancel,
  show,
  setShow,
}: Props) => {
  const handleClose = () => {
    handleCancel();
    setShow(false);
  };

  const handleButton = () => {
    handleConfirm();
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <Modal centered show={show} onHide={handleClose} onShow={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleButton}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
