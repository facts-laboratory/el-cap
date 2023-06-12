import { useState, useEffect } from 'react';
import ArrowDown from '../icons/arrowDown';

type DropDownFeedOptionsProps = {
    feedOptions: FeedOption[],
    goToFeed: (key: string) => void,
};
type FeedOption = {
  title: string,
  key: string,
};

const DropDownFeedOptions: React.FC<DropDownFeedOptionsProps> = ({feedOptions, goToFeed}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const selectFeed = (index: number) => {
    setSelected(index);
    goToFeed(feedOptions[index].key);
    setIsOpen(false);
  }
  useEffect(() => {
    setSelected(0);
  }, [search]);

  // Filter the options based on the search string
  const filteredOptions = feedOptions.filter(option => option.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative inline-block group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white text-sm whitespace-nowrap px-4 py-3 rounded-full font-bold flex items-center hover:outline-yellow-400 ${
          isOpen ? 'outline outline-yellow-400 outline-1' : 'outline-none'
        }`}
      >
        <span className="hidden sm:block">{filteredOptions.length > 0 ? filteredOptions[selected].title : ""}</span>
        <ArrowDown className="w-5 h-5" width={32} height={32} />
      </button>
      <div
        className={`mt-2 px-4 text-xs py-4 absolute z-10 sm:-left-[470px] -left-[300px] bg-white rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
      >
        <div className="w-56">
          <div className="flex items-center p-1 px-4 bg-gray-300 placeholder-gray-400 border-none appearance-none rounded-xl my-4">
            <input
              placeholder="Search..."
              required={true}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="m-1 w-40 text-black focus:outline-none focus:placeholder-transparent focus:ring-0 bg-gray-300"
            />{' '}
            {/*...*/}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 text-sm">
          {filteredOptions.map((val, key) => {
              return (
                <div className="p-1 cursor-pointer" key={key}>
                  <span
                    onClick={() => selectFeed(key)}
                    className={`${
                      selected === key ? 'bg-yellow-300' : ''
                    } rounded-lg px-4 py-2 font-bold whitespace-nowrap`}
                  >
                    {val.title}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DropDownFeedOptions;
