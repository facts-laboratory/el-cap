import { ReactNode } from 'react';

export interface StandardFooterProps {
  children: ReactNode;
}

export function StandardFooter(props: StandardFooterProps) {
  const { children } = props;

  return (
    <footer className="bg-primary w-full relative">
      <div className="container mx-auto py-4">{children}</div>
    </footer>
  );
}

export default StandardFooter;
