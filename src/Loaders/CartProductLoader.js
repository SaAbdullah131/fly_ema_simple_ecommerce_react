import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader =async()=> {
    const loadedProduct = await fetch('products.json');
    const products = await loadedProduct.json();

    // if cart data is in database, you have to use async await
    const storedCard = getShoppingCart();
    const savedCart = [];

    console.log(storedCard);
    for(const id in storedCard) {
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct) {
            const quantity = storedCard[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

   return savedCart;
}

export default cartProductsLoader;