import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[]);

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // STEP 1; Get id of the addedProduct 
        for(const id in products) {
            // STEP 2: Get the product from products state by using id
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct) {
                // STEP 3: Add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // STEP 4: Add the addedProduct to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log("added product:",addedProduct);
        }
        // STEP 5: set the cart
        setCart(savedCart);

    },[products])
    // useEffect(()=>{
    //     // console.log('products: ',products);
    //     const storedCart = getShoppingCart();
    //     // console.log(storedCart);
    //     // step 1: get id
    //     for(const id in storedCart) {
    //         // console.log(id)
    //         // Step 2: get the product by using id
    //         const addedProduct = products.find(product=>product.id === id);

    //         // console.log(savedProduct)
    //         // STEP 3: Get the quantity of the product
    //         const quantity = storedCart[id];
    //         addedProduct.quantity = quantity;
    //         console.log(addedProduct);
    //     }
    // },[products]);
     
    const handleAddToCart =(product)=> {
        // console.log(product);
        const newCart = [...cart,product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'> 
            <div className="products-container">

               {
                products.map(product=><Product
                key={product.id}
                product = {product}
                handleAddToCart={handleAddToCart}
                ></Product>)
               }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;