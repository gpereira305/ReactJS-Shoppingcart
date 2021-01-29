import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';



import useStyles from './cartItemStyle';




const CartItem = ({item, onUpdateCartQty, onRemoveFromCart}) => {
    const classes = useStyles();


    return (
        <Card>
            <CardMedia 
            image={item.media.source} 
            alt={item.name}
            className={classes.media}
          />
          <CardContent className={classes.cardContent}>
              <Typography variant='h5'>{item.name}</Typography>
              <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
          </CardContent>
          <CardActions style={{justifyContent:'space-between'}}>
              <div className={classes.buttons}>
                  <Button type='button' size='small'
                     onClick={() => onUpdateCartQty(
                     item.id, item.quantity - 1 )}>
                      -
                  </Button>
                  <Typography>{item.quantity}</Typography> 
                  <Button type='button' size='small'
                     onClick={() => onUpdateCartQty(
                     item.id, item.quantity + 1 )}>
                      +
                  </Button>
              </div>
              <Button 
                    onClick={() => onRemoveFromCart(item.id)}
                    type='button' 
                    color='secondary' 
                    variant='contained'>
                    Remover
              </Button>
          </CardActions>
        </Card>
    )
};

export default CartItem;
