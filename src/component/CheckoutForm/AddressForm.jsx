import React, { useEffect, useState } from 'react';
import { Select,Button, Grid, Typography, InputLabel, MenuItem} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInputField from './FormInputField'
import { commerce } from '../../lib/commerce';




const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState(''); 

    const methods = useForm();

    /*  Converts an object to an array and maps through it again to a normal array
        and returns an object with id and label    */
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name})); 

    const options = shippingOptions.map((shippingOption) => ({
        id: shippingOption.id, label: `${shippingOption.description} - 
        (${shippingOption.price.formatted_with_symbol})`

    }));


    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async(countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);   
        
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)

    }, []);

    useEffect(() => {
       if(shippingCountry) fetchSubdivisions(shippingCountry)

    }, [shippingCountry]);

    useEffect(() => {
       if(shippingSubdivision) {
           fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
       }

    }, [shippingSubdivision]);


    return (
        <>
           <Typography variant='h6' gutterBottom>Endereço de Entrega</Typography>
           <FormProvider {...methods}>
               <form onSubmit={
                   methods.handleSubmit((data) => next({
                       ...next, 
                       shippingCountry, 
                       shippingSubdivision, 
                       shippingOption
                   }))
                }>
                   <Grid container spacing={3}>
                       <FormInputField name='firstName' label='Nome'/>
                       <FormInputField name='lastName' label='Sobrenome'/>
                       <FormInputField name='address1' label='Endereço'/>
                       <FormInputField name='email' label='Email'/>
                       <FormInputField name='city' label='Cidade'/>
                       <FormInputField name='zip' label='CEP'/>
                       <Grid item xs={12} sm={6}>
                       <InputLabel>País</InputLabel>
                           <Select 
                                fullWidth
                                value={shippingCountry} 
                                onChange={(e) => 
                                setShippingCountry(e.target.value)} 
                                > 
                                { countries.map((country) => (
                                    <MenuItem 
                                      key={country.id} 
                                      value={country.id}
                                      >
                                        {country.label}
                                    </MenuItem>
                                 ))} 
                           </Select>
                       </Grid>
                       <Grid item xs={12} sm={6}>
                           <InputLabel>Regiões</InputLabel>
                           <Select 
                                fullWidth
                                value={shippingSubdivision} 
                                onChange={(e) => 
                                setShippingSubdivision(e.target.value)} 
                                > 
                                { subdivisions.map((subdivision) => (
                                    <MenuItem 
                                      key={subdivision.id} 
                                      value={subdivision.id}
                                      >
                                        {subdivision.label}
                                    </MenuItem>
                                 ))} 
                           </Select>
                       </Grid>
                       <Grid item xs={12} sm={6}>
                           <InputLabel>Frete</InputLabel>
                           <Select 
                               value={shippingOption} 
                               fullWidth onChange={(e) => 
                               setShippingOption(e.target.value)}
                             >
                              { options.map((option) => (
                                    <MenuItem 
                                      key={option.id} 
                                      value={option.id}
                                      >
                                        {option.label}
                                    </MenuItem>
                                 ))} 
                           </Select>
                       </Grid>
                   </Grid>
                   <br/>
                   <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                       }}> 
                       <Button
                          variant='outlined'
                          component={Link}
                          to='/cart'
                        >
                        Voltar ao carrinho
                       </Button>
                       <Button 
                          variant='contained'
                          type='submit'
                          color='primary'
                          >
                           Próximo
                       </Button>
                   </div>
               </form>
           </FormProvider>
        </>
    )
}

export default AddressForm;