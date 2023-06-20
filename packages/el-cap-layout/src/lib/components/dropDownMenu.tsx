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
            className="flex flex-col space-y-3 font-bold text-lg mb-4"
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
                className="inline-flex space-x-3 items-center cursor-pointer"
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
          <Tooltip
            content={
              <div className="grid grid-cols-2 min-w-[30rem] gap-10 bg-white p-6 rounded-lg shadow-lg">
                <div>{groupMenu(groupedOptions.slice(0, 2))}</div>
                <div>{groupMenu(groupedOptions.slice(2, 4))}</div>
              </div>
            }
            arrow={false}
            style="light"
            className="p-0 shadow-none"
          >
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              {label}
            </span>
          </Tooltip>
        ) : (
          <Tooltip
            content={
              <div className="min-w-[10rem] gap-10 bg-white p-6 rounded-lg shadow-lg">
                {groupMenu(groupedOptions)}
              </div>
            }
            arrow={false}
            style="light"
            className="p-0 shadow-none"
          >
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              {label}
            </span>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default DropDownMenu;
