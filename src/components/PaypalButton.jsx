import React from "react";

function PaypalButton(props) {
  const paypalRef = React.useRef();

  //TODO: Replace this demo data with real data passed as a prop
  const service = {
    price: 120,
    name: "Plant care",
    description: "Taking care of Devil's Ivy plant for 12 days",
    currency: "EUR",
  };

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
                description: service.description,
                amount: {
                  currency_code: service.currency,
                  value: service.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [service.currency, service.description, service.price]);

  return (
    <div>
      <div ref={paypalRef} />
    </div>
  );
}

export default PaypalButton;
