import { useState } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleOverlayClick = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleOverlayClick}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-4">{children}</div>
        </div>
      )}
    </>
  );
}