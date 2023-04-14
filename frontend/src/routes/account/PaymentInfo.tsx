import React from "react";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

import Axios from "axios";

import {
  Link,
  Form,
  useOutletContext,
  Navigate,
  useNavigate,
} from "react-router-dom";

const PaymentInfo = () => {
  const navigate = useNavigate();

  const token = useOutletContext().user.token;

  // Check if url contains "payment". If so, user is signing up
  const signingUp = window.location.href.includes("payment");

  // Get payment and address info from API
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    Axios.get("http://127.0.0.1:8000/user", {
      params: {
        token,
      },
    })
      .then((res) => {
        setPaymentMethod(res.data.payment_method);
        setAddress(res.data.address);
      })
      .catch((err) => {
        alert(
          "There was an error fetching your payment and shipping information. Please try again later."
        );
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios.post("http://127.0.0.1:8000/user", {
      token,
      payment_method: paymentMethod,
      address,
    })
      .then((res) => {
        console.log(res.data);
        if (signingUp) {
          navigate("/");
        } else {
          alert("Payment and shipping information updated successfully!");
        }
      })
      .catch((err) => {
        alert(
          "There was an error updating your payment and shipping information. Please try again later."
        );
      });
  };

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
              In order to make purchases or receive payments, you must provide a
              valid U.S. address and payment identifier.
            </p>
            <div className="card p-3">
              <Form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingCard"
                    placeholder="XXXX XXXX XXXX XXXX"
                    pattern="^\d{4}([ -]?\d{4}){3}$"
                    maxLength={19}
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingCard">
                    <BsFillCreditCardFill /> Payment Identifier
                  </label>
                  <small>
                    A sixteen digit number, optionally separated by spaces or
                    hyphens.
                  </small>
                </div>
                <hr />
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingAddress"
                    placeholder="1234 Main St"
                    maxLength={19}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingAddress">
                    <MdLocationPin /> Shipping Address
                  </label>
                  <small>A valid U.S. address.</small>
                </div>
                {/* <div className="input-group mb-3">
                  <span className="input-group-text" id="address-label">
                    Address
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="address-input"
                    aria-describedby="address-label"
                    placeholder="1234 Main St"
                    required
                    pattern="\d{1,5}\s\w+\s\w+\.?"
                    minLength={5}
                    maxLength={50}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="city-label">
                    City
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="city-input"
                    aria-describedby="city-label"
                    placeholder="Anytown"
                    required
                    pattern="[A-Za-z\s]+"
                    minLength={2}
                    maxLength={30}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="state-label">
                        State
                      </span>
                      <select
                        className="form-select"
                        id="state-input"
                        aria-describedby="state-label"
                        defaultValue={"Choose..."}
                      >
                        <option>Choose...</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="zip-label">
                        Zip
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="zip-input"
                        aria-describedby="zip-label"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Save
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
