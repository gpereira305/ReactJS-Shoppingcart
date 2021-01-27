import React from 'react'; 
import useStyles from './productStyles'; 
import { Card,  CardMedia, CardContent, CardActions, Typography, IconButton, Button} from '@material-ui/core'; 
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';




const Product = ({product, onAddToCart}) => {
    const classes = useStyles(); 
 

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={product.media.source}
                title={product.name}
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                         {product.name}
                    </Typography>
                    <Typography variant='h5'>
                         {product.price.formatted_with_symbol}
                    </Typography>
                </div>

                <Typography 
                   dangerouslySetInnerHTML={{ __html: product.description}} 
                  variant='body2' color='textSecondary' 
                />
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() =>
                onAddToCart(product.id, 1)}>
                    Adicionar ao Carrinho  
                    <AddShoppingCartIcon/>
            </Button>

            </CardActions>
        </Card>
    )
}

export default Product;


// <IconButton aria-label='add to Cart'>
// <AddShoppingCart/>
// </IconButton>
