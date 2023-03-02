import React, { useEffect } from "react";

import ReactPortal from "./ReactModal";
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
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0  h-screen w-screen bg-neutral-200 opacity-50 " />
        <div className="fixed box-border flex min-w-fit flex-col overflow-hidden rounded">
          {React.cloneElement(children, { handleClose })}
        </div>
      </>
    </ReactPortal>
  );
};
export default Modal;
