export interface IIcon {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const PortfolioIcon: React.FC<IIcon> = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M13.7927 8.0094L9.10522 8.0094C8.58667 8.0094 8.16772 7.59045 8.16772 7.0719L8.16772 2.3844C11.2732 2.3844 13.7927 4.90393 13.7927 8.0094ZM8.16772 15.5094C10.1568 15.5094 12.0645 14.7192 13.471 13.3127C14.8775 11.9062 15.6677 9.99852 15.6677 8.0094C15.6677 6.02028 14.8775 4.11262 13.471 2.7061C12.0645 1.29958 10.1568 0.5094 8.16772 0.5094C6.1786 0.5094 4.27095 1.29958 2.86442 2.7061C1.4579 4.11262 0.667724 6.02028 0.667724 8.0094C0.667724 9.99852 1.4579 11.9062 2.86442 13.3127C4.27095 14.7192 6.1786 15.5094 8.16772 15.5094Z"
        fill="black"
      />
    </svg>
  );
};

export default PortfolioIcon;
