import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import './Product.css';

const product = (props) => {
 return (
     
         <Card width='100%' className='zoom'>
            <CardImg src={props.image} alt={props.name} height='250'/>
            <CardBody className='cardBody'>
                <CardTitle>{props.name}</CardTitle>
                <CardText>{props.dropdownValue === 'INR' 
                            ? <span>&#8377; {parseFloat(props.price * props.conversionValue).toFixed(2)}</span> 
                            : <span>$ {parseFloat(props.price * props.conversionValue).toFixed(2)}</span>
                          }
                </CardText> 
            </CardBody>
        </Card>
    )
}

export default product;