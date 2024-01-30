export type ButtonProps = {
  title: string;
  isSecondary?: boolean;
  callback: () => void;
};

export type InputProps = {
  placeholder?: string;
  value: string;
  callback: (e: string) => void;
};

export type DropdownOptions = {
  value: string;
  name: string;
};

export type DropdownProps = {
  options: DropdownOptions[];
  infoOption: string;
  value: string;
  callback: (n: string) => void;
};

export type Photo = {
  id: number;
  alt: string;
  portrait: string;
  landscape: string;
  original: string;
  height: number;
  width: number;
};

export type SavedImage = {
  id: string;
  name: string;
  surname: string;
  topic: string;
  image: Photo;
};

export type ImageContextType = {
  allSavedImages: SavedImage[];
  setAllSavedImages: React.Dispatch<React.SetStateAction<SavedImage[]>>;
  addImage: (image: SavedImage) => void;
  getImage: (id: string) => SavedImage;
  removeImage: (id: string) => void;
  editImage: (image: SavedImage, id: string) => void;
};

export type ModalProps = {
  heading: string;
  show: boolean;
  callback: (n: boolean) => void;
  children: React.ReactNode;
};

export type FormProps = {
  modalCallback: (n: boolean) => void;
};

export type CardProps = {
  image: SavedImage;
  callback: (n: string) => void;
};
