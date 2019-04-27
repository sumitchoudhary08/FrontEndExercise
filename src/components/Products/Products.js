import React from 'react';
import Product from './Product/Product';

const products = (props) => {
    return props.products.map((product) => {
        return (
            <div className="col-md-3 p-3" key={product.productId}>
                <Product 
                productId = {product.productId}
                name={product.name} 
                price={product.price}
                image={product.image}
                dropdownValue={props.dropdownValue}
                conversionValue = {props.conversionValue} />
            </div>
        )
    });
}

export default products;

