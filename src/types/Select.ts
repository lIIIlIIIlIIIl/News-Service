export interface Options {
  value: string;
  title: string;
}

export interface SelectBoxProps {
  name: string;
  options: readonly Options[];
}
