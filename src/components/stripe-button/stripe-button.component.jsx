import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H6xLsIFsDmZSF8DzWhsTtGrC3FdQdMMIWSiOAYyaGFl8q3bopOZfHmwjl3AuldKPBweeNsqe6SFXLQIPrw7aXy400DHxk1Jgf';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return(
        <StripeCheckout 
            label='Pay Now' 
            name='CRWN Clothing Ltd.' 
            billingAddress 
            shippingAddress 
            image='https://sendeyo.com/up/d/f3eb2117da' 
            description={`Your totla is $${price}`} 
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            locale='kr'/>
    )

}


export default StripeCheckoutButton;