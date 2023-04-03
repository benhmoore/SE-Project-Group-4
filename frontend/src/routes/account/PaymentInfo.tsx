import React from "react";

import { Link, Form } from "react-router-dom";

interface Props {
  signingUp: boolean;
}

const PaymentInfo = ({ signingUp = false }: Props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h1>
              {(signingUp && "Add Payment and Shipping") ||
                "Payment and Shipping"}
            </h1>
            <p>
              In order to make purchases or receive payment, you must provide a
              valid U.S. address and payment identifier.
            </p>
            <div className="card p-3">
              <Form>
                <div className="form-floating mb-3">
                  <input
                    type="address"
                    className="form-control"
                    id="floatingAddress"
                    placeholder="3493 10th St. NW, Washington, DC 20010"
                    required
                  />
                  <label htmlFor="floatingAddress">Address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPaymentInfo"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="floatingPaymentInfo">
                    Payment Identifier
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInfo;
