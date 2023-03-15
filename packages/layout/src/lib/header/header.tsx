import { ReactNode, useRef } from 'react';

export interface StandardHeaderProps {
  children: ReactNode;
}

export function StandardHeader(props: StandardHeaderProps) {
  const { children } = props;

  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  return (
    <header className="bg-primary w-full relative">
      <div className="container mx-auto py-4">
        <div className="navbar" ref={ref}>
          {children}
        </div>
      </div>
    </header>
  );
}

export default StandardHeader;
