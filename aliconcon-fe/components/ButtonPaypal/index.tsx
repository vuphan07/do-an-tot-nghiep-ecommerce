import React from 'react';
import { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

type Props = {};
const style = { layout: 'vertical' };
const currency = 'USD';
const ButtonPaypal = ({ amount, onFinish, disabled }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, []);
  return (
    <PayPalButtons
      onInit={() => console.log('init')}
      style={{ layout: 'vertical' }}
      disabled={disabled}
      forceReRender={[amount, currency, style]}
      fundingSource={undefined}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          })
          .then((orderId) => {
            return orderId;
          });
      }}
      onApprove={function (data, actions) {
        return actions.order.capture().then(function (res) {
          onFinish({ orderId: res.id });
        });
      }}
    />
  );
};

export default ButtonPaypal;
