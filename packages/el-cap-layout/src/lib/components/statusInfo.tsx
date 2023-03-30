export interface IStatusInfo {
  text: string;
  value: string;
  className?: string;
}

const StatusInfo: React.FC<IStatusInfo> = (props) => {
  return (
    <div className={`${props.className} text-sm whitespace-nowrap`}>
      {props.text}
      <span className="text-light-blue1 ml-2 hover:text-light-blue2 hover:cursor-pointer">
        {props.value}
      </span>
    </div>
  );
};

export default StatusInfo;
