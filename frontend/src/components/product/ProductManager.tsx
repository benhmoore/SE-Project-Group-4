import React from "react";

const ProductManager = () => {
  return (
    <form className="col-6">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Product Name"
          required
          maxLength={50}
          minLength={10}
          pattern="[A-Za-z0-9 ]+"
        />
        <label htmlFor="floatingInput">Product Name</label>
        <small>
          Product names must be <strong>10 to 50 characters</strong> in length,
          consisting only of <strong>letters, numbers, and spaces</strong>.
        </small>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Provide a meaningful description of your product."
          id="floatingTextarea2"
          maxLength={200}
          style={{ height: "200px" }}
          required
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
          className="form-control"
          id="floatingInput"
          placeholder="Product Price"
          required
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
        />
        <label htmlFor="floatingInput">Stock Quantity</label>
        <small>
          Stock quantities must be <strong>whole numbers</strong> greater than
          zero.
        </small>
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Submit for Review
      </button>
    </form>
  );
};

export default ProductManager;
