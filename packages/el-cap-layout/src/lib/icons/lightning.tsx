export interface IIcon {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const LightningIcon: React.FC<IIcon> = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 13 19"
      fill="none"
    >
      <path
        d="M10.7453 2.34321C10.9451 1.87941 10.7961 1.33774 10.3865 1.03982C9.97683 0.741908 9.41824 0.768991 9.03568 1.10076L0.369018 8.6841C0.0304764 8.98201 -0.0880131 9.45936 0.0677161 9.88253C0.223445 10.3057 0.633081 10.5833 1.08334 10.5833H4.85808L2.25469 16.6568C2.05496 17.1206 2.20391 17.6622 2.61355 17.9601C3.02318 18.2581 3.58178 18.231 3.96433 17.8992L12.631 10.3159C12.9695 10.0179 13.0914 9.54061 12.9323 9.12081C12.7732 8.70102 12.3703 8.42003 11.9167 8.42003H8.14193L10.7453 2.34321Z"
        fill="url(#paint0_linear_118_469)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_118_469"
          x1="6.50075"
          y1="0.833008"
          x2="6.50075"
          y2="18.167"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F29D3E" />
          <stop offset="1" stopColor="#FACB4C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LightningIcon;
