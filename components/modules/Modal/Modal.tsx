import { ModalProps } from "@/types/types";
import Form from "../Form/Form";

const Modal = ({ heading, show, callback }: ModalProps) => {
  return (
    show && (
      <div className="absolute w-full h-dvh bg-slate bg-opacity-70 flex flex-col items-center">
        <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 bg-secondary rounded-md mt-10 p-4">
          <div className="flex justify-between px-4 md:px-8">
            <h2 className="text-gray text-lg font-medium py-2">{heading}</h2>
            <a
              className="bi bi-x text-2xl cursor-pointer"
              onClick={() => callback(false)}
            />
          </div>
          <Form modalCallback={callback} />
        </div>
      </div>
    )
  );
};

export default Modal;
