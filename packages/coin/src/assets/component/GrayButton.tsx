export interface IButton {
  text: string;
  active?: boolean;
  svg?: string;
}

const GrayButton: React.FC<IButton> = (
  props = { svg: "", text: "", active: false }
) => {
  return (
    <div
      className={`${
        props.active ? "bg-[#575757] text-white" : "bg-[#D9D9D9] text-[#7D7D7D]"
      } hover:bg-gray-300 rounded-xl px-4 hover:cursor-pointer flex`}
    >
      {props.svg ? <img src={props.svg} alt="svg" /> : ""}
      <span>{props.text}</span>
    </div>
  );
};

export default GrayButton;
