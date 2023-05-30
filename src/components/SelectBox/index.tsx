import "./SelectBox.css";
import { Options, SelectBoxProps } from "../../types/Select";

const SelectBox = ({ name, options }: SelectBoxProps) => {
  return (
    <select name={name} className="select-box">
      {options.map((element: Options) => {
        return (
          <option key={element.value} value={element.value}>
            {element.title}
          </option>
        );
      })}
    </select>
  );
};

export default SelectBox;
