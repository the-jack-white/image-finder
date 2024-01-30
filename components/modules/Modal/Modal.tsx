import { ModalProps } from "@/types/types";

const Modal = ({ heading, show, callback, children }: ModalProps) => {
  return (
    show && (
      <div className="fixed top-0 z-50 w-full h-dvh bg-slate bg-opacity-70 flex flex-col items-center">
        <div className="w-[95%] max-w-sm sm:w-1/2 lg:w-1/3 bg-secondary rounded-md mt-5 p-4">
          <div className="flex justify-between md:px-4">
            <h2 className="text-gray text-lg font-medium py-2">{heading}</h2>
            <a
              className="bi bi-x text-2xl cursor-pointer"
              onClick={() => callback(false)}
            />
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
