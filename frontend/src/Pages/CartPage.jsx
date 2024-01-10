import { useCart } from "../Contexts/StoreContext";

function CartPage() {
  const cart = useCart();
  const products = Object.values(cart).map((item) => item);

  return (
    <div className='grid-container'>
      <div>
        <h1>Selected Products</h1>
        <ul>
          {products.map(product => (
            <div className='product-container'>
              <li key={product.id}>{product.name} - Quantity: {product.quantity}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CartPage;
