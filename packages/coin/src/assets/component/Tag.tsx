type TagProps = {
  tagName: string;
  goToTag: (tagName: string) => void;
};

const Tag: React.FC<TagProps> = (props) => {
  return (
    <div
      className={`bg-[#D9D9D9] text-[#7D7D7D] hover:bg-gray-300 rounded-xl px-4 hover:cursor-pointer flex`}
      onClick={() => props.goToTag(props.tagName)}
    >
      <span>{props.tagName}</span>
    </div>
  );
};

export default Tag;
