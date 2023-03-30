export interface IIcon {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const TrendingIcon: React.FC<IIcon> = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 20 24"
      fill="none"
    >
      <path
        d="M0 12.8311C0 6.92197 7.85714 0.5 7.85714 0.5C7.85714 0.5 10.7366 3.1446 11.8125 4.48697C12.3036 3.84478 13.9286 2.57376 13.9286 2.57376C13.9286 2.57376 20 7.63106 20 12.8266C20 18.5261 15.5446 23.3337 10 23.3337C4.39286 23.3337 0 18.5217 0 12.8311ZM10.0759 19.0524C11.2054 19.0524 12.2054 18.7402 13.1473 18.1158C15.0268 16.8047 15.5313 14.1824 14.4018 12.122C14.2768 11.8722 14.1518 11.6225 13.9643 11.3728L11.7054 13.9951C11.7054 13.9951 8.07143 9.37481 7.81696 9.06263C5.94196 11.3728 5 12.6839 5 14.1824C5 17.2417 7.25893 19.0524 10.0759 19.0524Z"
        fill="url(#paint0_linear_118_129)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_118_129"
          x1="10"
          y1="0.5"
          x2="10"
          y2="23.3337"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F29D3E" />
          <stop offset="1" stopColor="#B63737" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TrendingIcon;
