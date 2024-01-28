export type DropdownOptions = {
  value: string;
  name: string;
};

export type DropdownProps = {
  options: DropdownOptions[];
  callback: (n: string) => void;
};

export type Photo = {
  id: number;
  alt: string;
  portrait: string;
  landscape: string;
  height: number;
  width: number;
};
