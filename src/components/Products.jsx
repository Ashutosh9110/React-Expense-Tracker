import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";

const products = [
  { id: 1, title: "My First Book", description: "The first book I ever wrote", price: 6 },
  { id: 2, title: "My Second Book", description: "The second book I ever wrote", price: 5 },
];

export default function Products() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Buy Your Favorite Products</h2>
      <div className="space-y-6 w-full max-w-lg">
        {products.map((p) => (
          <div key={p.id} className="bg-white text-black p-6 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p>{p.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-semibold mb-2">${p.price.toFixed(2)}</span>
              {getQuantity(p.id) === 0 ? (
                <button
                  onClick={() => dispatch(addToCart(p))}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(removeFromCart(p.id))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span>{getQuantity(p.id)}</span>
                  <button
                    onClick={() => dispatch(addToCart(p))}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
