import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, title }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className=" flex flex-col items-center bg-white rounded-lg shadow-lg w-80 p-6">
        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Modal Body */}
        <p className="text-gray-700 mb-6">{message}</p>

        {/* Modal Footer */}
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ConfirmationModal;
