import { ReactNode } from 'react';

export interface StandardFooterProps {
  children: ReactNode;
}

export function StandardFooter(props: StandardFooterProps) {
  const { children } = props;

  return (
    <footer className="bg-gray-800 w-full relative text-white">
      <div className="container mx-auto py-4 flex justify-center items-center">
        {children}
      </div>
    </footer>
  );
}

export default StandardFooter;
