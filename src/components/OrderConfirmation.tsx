interface OrderProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryDate:string
}

const OrderConfirmation = ({ isOpen, onClose, deliveryDate}: OrderProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center w-[90%] md:w-[400px]">
          <h2 className="text-2xl font-bold text-green-600 mb-3">
            🎉 Congratulations!
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Your order has been confirmed.
          </p>
          <p className="text-gray-800 font-semibold mb-6">
            Expected Delivery : <span className="text-gray-600">{deliveryDate}</span>
          </p>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
