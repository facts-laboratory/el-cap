export interface IStatusInfo {
  text: string;
  value: string;
  className?: string;
}

const StatusInfo: React.FC<IStatusInfo> = (props) => {
  return (
    <div className={`${props.className} text-sm whitespace-nowrap`}>
      {props.text}
      <span className="text-gray-400 ml-2 hover:text-gray-300 hover:cursor-pointer">
        {props.value}
      </span>
    </div>
  );
};

export default StatusInfo;
