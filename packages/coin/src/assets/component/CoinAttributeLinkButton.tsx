import { useState, useEffect, useRef } from 'react';
import ArrowDropDown from '../icons/arrowDropDown';
import Link from '../icons/link';

type CoinAttributeLinkProps = {
  icon: string;
  title: string;
  url?: string;
  type: 'link' | 'dropdown';
  dropdownOptions?: DropdownOption[];
};

type DropdownOption = {
  title: string;
  icon: string;
  url: string;
};

const CoinAttributeLinkButton: React.FC<CoinAttributeLinkProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const goToPage = (pageUrl: string) => {
    window.open(`https://${pageUrl}`, '_blank');
  };

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const clickListener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', clickListener);

    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  return (
    <div>
      {props.type === 'link' ? (
        <div
          className={`cursor-pointer text-sm font-semibold flex items-center justify-center bg-[#D9D9D9] hover:bg-gray-300 rounded-xl py-1 px-2`}
          onClick={() => goToPage(props.url ? props.url : '')}
        >
          <img className="w-6 mr-2" src={props.icon} alt="svg" />
          <span>{props.title}</span>
          <Link className="ml-1" width={12} height={16} />
        </div>
      ) : (
        <div className="relative inline-block text-left" ref={ref}>
          <div>
            <div
              className={`cursor-pointer inline-flex justify-center items-center rounded-xl shadow-sm px-2 py-1 text-sm font-semibold focus:outline-none ${
                isOpen
                  ? 'bg-gray-500 text-white'
                  : 'bg-[#D9D9D9] hover:bg-gray-300'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <img className="w-6 mr-2" src={props.icon} alt="icon" />
              <span className="mr-2">Options</span>
              <ArrowDropDown width={16} height={16} />
            </div>
          </div>

          {isOpen ? (
            <div className="origin-top-right absolute mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div
                className="p-4"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {props.dropdownOptions?.map((val, key) => {
                  return (
                    <div>
                      <a
                        href={val.url}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-start items-center"
                        role="menuitem"
                      >
                        <img className="w-6 mr-2" src={val.icon} alt="icon" />
                        {val.title}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CoinAttributeLinkButton;
