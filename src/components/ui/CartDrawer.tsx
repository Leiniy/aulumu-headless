'use client';

import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
        <span className="text-6xl mb-6">🛒</span>
        <p className="text-xl font-semibold text-gray-500">Your cart is empty</p>
        <p className="text-sm mt-2 text-gray-400">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-primary">
          Shopping Cart ({totalItems})
        </h2>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {items.map((item) => (
          <div key={item.variantId} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-primary truncate leading-tight">
                {item.title}
              </h3>
              <p className="text-accent font-bold mt-1">
                ${parseFloat(item.price).toFixed(2)}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-sm">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors text-lg font-light"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors text-lg font-light"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-gray-100 bg-white rounded-t-3xl shadow-lg">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-500 text-sm">Subtotal</span>
          <span className="text-2xl font-extrabold text-primary">${totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Shipping and taxes calculated at checkout</p>
        <a
          href="https://vbiwbf-ev.myshopify.com/cart"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3.5 bg-accent text-white text-center text-sm font-bold rounded-full hover:bg-accent-hover transition-colors shadow-md"
        >
          Checkout on Shopify →
        </a>
      </div>
    </div>
  );
}