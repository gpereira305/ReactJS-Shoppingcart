import React from 'react';
import { Container, Typography, Button, Grid} from '@material-ui/core'; 
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './cartStyles';
import {Link} from 'react-router-dom';
import CartItem from  './CartItem/CartItem';







const Cart = ({ cart, handleUpdateCartQty,  handleRemoveFromCart,  handleEmptyCart }) => {

    const classes = useStyles(); 

    const EmptyCart = () => (
           <div style={{ textAlign: 'center', marginTop: '15rem'}}>
               <Typography  variant='h3'>
                  Carrinho Vazio  
               </Typography>  
               <Typography variant='h4'>
                   <Link  to='/' className={classes.link}> 
                     <ArrowBackIosIcon/>
                      Vá às Compras!
                   </Link>
               </Typography> 
           </div>
    );

    const FilledCart = () => (
         <>
           <Typography  
               className={classes.title} 
               variant='h5' 
               gutterBottom>
               Carrinho de Compras
            </Typography>
             <Grid container spacing={3}>
                 {cart.line_items.map((item) => (
                     <Grid item xs={12} sm={4} key={item.id}>
                          <CartItem item={item}
                            onUpdateCartQty={handleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}  
                          />
                     </Grid>
                 ))}
             </Grid>
             <div className={classes.cardDetails}>
                   <Typography variant='h5'>
                       Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button
                           className={classes.emptyButton}
                           size='large' type='button'
                           variant='contained' color='secondary'
                           onClick={handleEmptyCart}
                        >
                         Remover tudo
                        </Button>
                        <Button
                           component={Link} to='/checkout'
                           className={classes.checkoutButton}
                           size='large' type='button'
                           variant='contained' color='primary'
                        >
                          Checkout
                        </Button>
                    </div>
             </div>

         </>
    );

    if(!cart.line_items)  return 'Carregando...';


    return (
        <Container>
              <div className={classes.toolbar}/> 

           
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart;
