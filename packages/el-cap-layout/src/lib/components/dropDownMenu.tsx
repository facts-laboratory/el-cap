import { Component, ReactNode } from 'react';
import { Tooltip } from 'flowbite-react';

type DropDownMenuProps = {
  label: string;
  groupedOptions: DropDownGroup[];
  goToFeed: (label: string) => void;
};

type DropDownGroup = {
  groupLabel: string;
  options: DropDownOption[];
};

type DropDownOption = {
  label: string;
  destination: string;
  image: string;
  available: boolean;
};

class DropDownMenu extends Component<DropDownMenuProps> {
  render(): ReactNode {
    const { groupedOptions, goToFeed, label } = this.props;

    const handleOptionClick = (option: DropDownOption) => {
      if (option.available) {
        goToFeed(option.destination.toLowerCase());
      } else {
        alert('Coming soon');
      }
    };

    const groupMenu = (groupOption: DropDownGroup[]) => {
      return groupOption.map((group: DropDownGroup, key) => {
        return (
          <div
            key={key}
            className="flex flex-col space-y-1 font-semibold text-base mb-2"
          >
            {group.groupLabel ? (
              <h3 className="text-gray-400">{group.groupLabel}</h3>
            ) : groupOption.length > 1 ? (
              <div className="h-px w-full bg-gray-200 border-0 mb-2"></div>
            ) : (
              ''
            )}
            {group.options.map((option: DropDownOption, key) => (
              <div
                className="inline-flex space-x-3 items-center cursor-pointer p-2 font-semibold hover:bg-gray-100"
                key={key}
                onClick={() => handleOptionClick(option)}
              >
                <img
                  src={option.image}
                  className="w-8 object-contain h-8"
                  alt={option.label}
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        );
      });
    };

    return (
      <div className="group">
        {groupedOptions.length > 1 ? (
          <div className="mx-auto flex items-center justify-center">
            <div className="group relative cursor-pointer">
              <div className="flex items-center justify-between space-x-5 bg-white px-4 h-[60px]">
                <div className="menu-hover text-2xl font-bold text-black lg:mx-2">
                  {label}
                </div>
              </div>
              <div className="grid grid-cols-2 min-w-[40rem] invisible text-lg absolute left-1/2 transform -translate-x-1/2 group-hover:visible bg-white rounded-lg shadow-xl p-8 ring-1 ring-black ring-opacity-30 top-14 z-50">
                <div>{groupMenu(groupedOptions.slice(0, 2))}</div>
                <div>{groupMenu(groupedOptions.slice(2, 4))}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex items-center justify-center">
            <div className="group relative cursor-pointer">
              <div className="flex items-center justify-between space-x-5 bg-white px-4 h-[60px]">
                <div className="menu-hover text-2xl font-bold text-black lg:mx-2">
                  {label}
                </div>
              </div>
              <div className="invisible text-lg absolute left-1/2 transform -translate-x-1/2 group-hover:visible min-w-[10rem] bg-white rounded-lg shadow-xl p-4 ring-1 ring-black ring-opacity-30 top-14 z-50">
                {groupMenu(groupedOptions)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DropDownMenu;
