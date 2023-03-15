import { ReactNode } from 'react';
/* eslint-disable-next-line */
export interface StandardContentContainerProps {
  children: ReactNode;
}

export function StandardContentContainer(props: StandardContentContainerProps) {
  const { children } = props;
  return (
    <section
      style={{ minWidth: 350 }}
      className="w-full flex flex-col items-start relative grow"
    >
      <div className="container mx-auto">{children}</div>
    </section>
  );
}

export default StandardContentContainer;
