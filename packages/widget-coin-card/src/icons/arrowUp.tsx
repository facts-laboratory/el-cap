export interface IIcon {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const ArrowUpIcon: React.FC<IIcon> = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 1024 1024"
    >
      <path
        fill={props.color}
        d="M758.4 385.92 539.52 140.16c-14.72-16.64-40.32-16.64-54.4 0L266.24 385.92C244.48 409.6 261.76 448 293.12 448l437.76 0C762.88 448 779.52 409.6 758.4 385.92z"
      />
    </svg>
  );
};

export default ArrowUpIcon;
