import { Component, ReactNode } from 'react';
import { Tooltip } from 'flowbite-react';

type DropDownMenuProps = {
  groupedOptions: DropDownGroup[];
  goToPage: (option: DropDownOption) => void;
};

type DropDownGroup = {
  groupLabel: string;
  options: DropDownOption[];
};

type DropDownOption = {
  value: string;
  label: string;
  destination: string;
  image: string;
};

class DropDownMenu extends Component<DropDownMenuProps> {
  render(): ReactNode {
    const { groupedOptions, goToPage } = this.props;

    return (
      <div className="group">
        {groupedOptions.map((group: DropDownGroup, key) => (
          <Tooltip
            key={key}
            content={
              <div className="min-w-[10rem] gap-10 bg-white py-8 px-6 rounded-lg shadow-lg">
                <div className="flex flex-col space-y-3 font-bold text-lg">
                  {group.options.map((option: DropDownOption, key) => (
                    <a
                      href={option.destination}
                      className="inline-flex space-x-3 items-center"
                      key={key}
                    >
                      <img
                        src={option.image}
                        className="w-8 object-contain h-8"
                        alt={option.label}
                      />
                      <span>{option.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            }
            arrow={false}
            style="light"
            className="p-0 shadow-none"
          >
            <span className="font-bold mr-10 hover:text-blue-500 hover:cursor-pointer">
              {group.groupLabel}
            </span>
          </Tooltip>
        ))}
      </div>
    );
  }
}

export default DropDownMenu;
