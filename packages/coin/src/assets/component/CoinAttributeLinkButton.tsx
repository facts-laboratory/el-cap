import { useState, useEffect, useRef } from 'react';
import ArrowDropDown from '../icons/arrowDropDown';
import Link from '../icons/link';

type CoinAttributeLinkProps = {
  icon: string;
  title: string;
  url?: string;
  type: 'link' | 'dropdown';
  dropdownOptions?: DropdownOption[] | [];
};

export type DropdownOption = {
  title: string;
  icon: string;
  url: string;
  type: 'link' | 'normal';
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
    <div className="font-semibold">
      {props.type === 'link' ? (
        <div
          className={`cursor-pointer text-sm flex items-center justify-center bg-[#D9D9D9] hover:bg-gray-300 rounded-xl py-1 px-2`}
          onClick={() => goToPage(props.url ? props.url : '')}
        >
          <img className="w-6" src={props.icon} alt="svg" />
          <span className="mx-1">{props.title}</span>
          <Link className="ml-1" width={12} height={16} />
        </div>
      ) : (
        <div className="relative inline-block text-left" ref={ref}>
          <div className="realtive">
            <div
              className={`cursor-pointer inline-flex justify-center items-center rounded-xl shadow-sm px-2 py-1 text-sm font-semibold focus:outline-none ${
                isOpen
                  ? 'bg-gray-500 text-white'
                  : 'bg-[#D9D9D9] hover:bg-gray-300'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <img className="w-6 mr-2" src={props.icon} alt="icon" />
              <span className="mr-2">{props.title}</span>
              <ArrowDropDown width={16} height={16} />
            </div>
            {isOpen && (
              <div className="border-[20px] border-transparent border-b-white absolute -bottom-5 left-[50%] transform -translate-x-1/2"></div>
            )}
          </div>

          {isOpen ? (
            <div className="origin-top-right absolute mt-4 rounded-md shadow-lg bg-white  ring-opacity-5 z-50">
              <div
                className="p-4"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu relative"
              >
                {props.dropdownOptions?.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="px-2 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-start items-center w-[max-content]"
                      onClick={() => goToPage(item.url)}
                    >
                      <img className="w-6 mr-2" src={item.icon} alt="icon" />
                      <div className="whitespace-nowrap mr-2">{item.title}</div>
                      {item.type === 'link' ? (
                        <Link width={12} height={16} />
                      ) : (
                        ''
                      )}
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
