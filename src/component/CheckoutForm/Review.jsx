import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';





const Review = ({checkoutToken}) => {
    return (
        <>
           <Typography variant='h5' gutterBottom>Resumo do seu Pedido</Typography> 

           <List disablePadding> 
              {checkoutToken.live.line_items.map((product) =>(
                  <ListItem style={{padding: '10px 0'}} key={product.name}>
                       <ListItemText
                           primary={product.name}
                           secondary={`Quantidade: ${product.quantity}`}
                       />
                       <Typography variant='body2'> 
                             <ListItemText
                                primary={product.line_total.formatted_with_symbol} 
                             /> 
                       </Typography>
                  </ListItem>
              ))}
              <ListItem style={{padding: '10px 0'}}> 
                    <ListItemText  primary='Total a Pagar:'/> 
                    <Typography variant='subtitle1' style={{fontWeight: 700}}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
              </ListItem>
           </List>  
        </>
    )
}

export default Review;
