import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const paymentId = searchParams.get("payment_id");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Thank you for your purchase!</p>
      <p>
        <strong>Amount Paid: ₹{amount}</strong>
      </p>
      <p>
        <strong>Payment ID: {paymentId}</strong>
      </p>
      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "white",
          background: "green",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
      >
        Go to Home
      </a>
    </div>
  );
};

export default PaymentSuccess;
