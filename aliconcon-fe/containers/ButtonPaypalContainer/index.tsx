import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import ButtonPaypal from '../../components/ButtonPaypal';

const ButtonPaypalContainer = (props) => {
  return (
    <div style={{ maxWidth: '750px', minHeight: '200px' }}>
      <PayPalScriptProvider
        options={{
          'client-id': 'Aae5FeMcFFymwxNd-sD41wYZt_5NOLWK-7aQKaAQ5OWUBC7fI-1-VgzLmpHaNLbwRZM5MVLeJ-zCeAEM',
          components: 'buttons',
          currency: 'USD',
        }}
      >
        <ButtonPaypal {...props} />
      </PayPalScriptProvider>
    </div>
  );
};

export default ButtonPaypalContainer;
