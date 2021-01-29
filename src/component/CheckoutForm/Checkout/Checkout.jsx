import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, Typography, CircularProgress, Divider, Button, StepLabel, CssBaseline} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import  useStyles from './checkoutStyle';
import PaymentFrom from '../PaymentForm';
import AddressFrom from '../AddressForm';



const steps = ['Endereço', 'Pagamento'];

const Checkout = ({cart, order, onCaptureCheckout, error, handleEmptyCart}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();



    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                 history.push('/')
            }
        }
        generateToken();
    }, [cart]);



    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => { 
        setShippingData(data);
        nextStep();
    };


    const timeout = () => { 
       setTimeout(() => {
        setIsFinished(true);
        handleEmptyCart()

       }, 4000)
    };





    // Will show to the user after payment
    let OrderConfirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>
                    Obrigado pela compra, {order.customer.firstName}
                    {order.customer.lastName}
                </Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_customer_reference}</Typography>
            </div> 
            <br/>
            <Button
               component={Link}
               to='/' variant='outlined'
               type='button'
            >
              Voltar à Home  
            </Button>
        </>

    ) : isFinished ? (
      <>
        <div>
            <Typography variant='h5'>Obrigado pela compra!</Typography>
            <Divider className={classes.divider}/> 
        </div> 
         <br/>
         <Button component={Link} to='/' variant='outlined' type='button'>
           Voltar à Home  
         </Button>
      </>

    ) : ( 
        <div className={classes.spinner}>
             <CircularProgress/>
        </div>
    );

    if(error){ 
        <> 
           <Typography variant='h5'>Error: {error}</Typography> 
           <br/>
           <Button 
              component={Link}
              to='/' variant='outlined'
              type='button'
            >
                Voltar à Home 
           </Button>
        </>
        
    }; 
    
    




    const Form = () => activeStep === 0
      ? <AddressFrom 
          checkoutToken={checkoutToken}
          next={next}
        />
      : <PaymentFrom 
           shippingData={shippingData} 
           checkoutToken={checkoutToken}
           onCaptureCheckout={onCaptureCheckout}
           timeout={timeout}
           nextStep={nextStep}
           backStep={backStep} 
        />





    return (
        <>
         <CssBaseline/>
         <div className={classes.toolbar}/>
         <main className={classes.layout}>
             <Paper className={classes.paper}>
                 <Typography variant='h4' align='center'>Checkout</Typography>
                 <Stepper activeStep={activeStep} className={classes.stepper}>
                      {
                         steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                      ))}
                 </Stepper>
                 { activeStep === steps.length
                    ? <OrderConfirmation/> 
                    : checkoutToken && <Form/>  
                 }
             </Paper>
         </main>   
        </>
    )
}

export default Checkout;
