import { useCart } from "../Contexts/StoreContext";

function CartPage(){
  const cart=useCart();
  console.log('Cart Contents:', JSON.stringify(cart, null, 2));
  return (
    <div>
      <h2>Cart Details</h2>
      <ul>
        {Object.keys(cart).map((key) => (
          <li key={key}>
            <strong>{key}:</strong> {cart[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;