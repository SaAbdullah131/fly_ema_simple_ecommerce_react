const cartProductsLoader =async()=> {
    const loadedProduct = await fetch('products.json');
    const products = await loadedProduct.json();
    console.log(products);
}

export default cartProductsLoader;