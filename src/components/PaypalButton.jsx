import React from "react";

//Displays the Paypal button and handles the payment success and failure
function PaypalButton(props) {
  const {paymentDetails, handlePaymentCompleted} = props;
  const paypalRef = React.useRef();
  const [paidFor, setPaidFor] = React.useState(false);

  React.useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: paymentDetails.description,
                amount: {
                  currency_code: paymentDetails.currency,
                  value: paymentDetails.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          setPaidFor(true);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [paymentDetails.currency, paymentDetails.description, paymentDetails.price]);

  if (paidFor) {
    handlePaymentCompleted();
  }

  return <div ref={paypalRef} />;
}

export default PaypalButton;
