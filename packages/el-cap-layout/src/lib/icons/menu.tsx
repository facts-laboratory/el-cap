export interface IIcon {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const MenuIcon: React.FC<IIcon> = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M2 16v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20V6H2z"></path>
    </svg>
  );
};

export default MenuIcon;
