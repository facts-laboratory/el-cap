export interface IIcon {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const ArrowDropDown: React.FC<IIcon> = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24">
      <path
        fill={props.color}
        d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"
      ></path>
    </svg>
  );
};

export default ArrowDropDown;
