import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn('max-w-8xl mx-auto px-5 sm:px-6 lg:px-20', className)}
      {...props}
    >
      {children}
    </Component>
  );
};
