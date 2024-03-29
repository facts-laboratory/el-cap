export interface IIcon {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const Link: React.FC<IIcon> = (props) => {
  return (
    <svg className={props.className} width={props.width} height={props.height}>
      <path
        fill={props.color}
        d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
      ></path>
    </svg>
  );
};

export default Link;
