import './skeleton.css';

/* eslint-disable-next-line */
export interface SkeletonProps {
  className: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={`skeleton h-4 ${className}`}></div>;
}
