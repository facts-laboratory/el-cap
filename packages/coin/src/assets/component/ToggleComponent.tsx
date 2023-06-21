import { useEffect, useRef, useState } from 'react';

type ToggleViewProps = {
  view: string[];
  setView: (view: string) => void;
};

const ToggleComponent: React.FC<ToggleViewProps> = ({ view, setView }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className="relative mr-2 px-4 py-2 bg-white rounded-xl overflow-auto">
      <div className="flex">
        {view.map((tab, idx) => {
          return (
            <button
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              className={`p-2 px-4 mx-2 z-20 font-bold whitespace-nowrap ${
                idx === activeTabIndex ? 'text-white' : 'text-black'
              }`}
              onClick={() => {
                setActiveTabIndex(idx);
                setView(tab);
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div
        className="absolute z-10 block bottom-3 bg-blue-500 transition-all duration-200 h-8 rounded-xl"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </div>
  );
};

export default ToggleComponent;
