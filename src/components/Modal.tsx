import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
interface ModalProps {
  children: React.ReactElement;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      e.key === "Escape" ? handleClose() : null;
      document.body.addEventListener("keydown", closeOnEscapeKey);
    };

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-neutral-600 opacity-40">
        <div className="fixed inset-y-32 box-border flex min-w-fit flex-col overflow-hidden rounded">
          <button
            onClick={handleClose}
            className="seld-end rounded border py-2 px-8 font-bold"
          >
            <RxCross2 />
          </button>
          <div className="h-5-6 box-border">{children}</div>
        </div>
      </div>
    </>
  );
};
export default Modal;
