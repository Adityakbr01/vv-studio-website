import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center font-medium transition-all duration-300 outline-none select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'rounded-full bg-[#D91A8A] text-white hover:bg-[#C21891] hover:shadow-[0_10px_25px_-5px_rgba(217,26,138,0.4)] hover:-translate-y-0.5 focus-visible:ring-[#D91A8A]',
        default:
          'rounded-full bg-[#D91A8A] text-white hover:bg-[#C21891] hover:shadow-[0_10px_25px_-5px_rgba(217,26,138,0.4)] hover:-translate-y-0.5 focus-visible:ring-[#D91A8A]',
        secondary:
          'rounded-full bg-transparent border border-white/40 text-white hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5 focus-visible:ring-white/50 backdrop-blur-xs',
        outline:
          'rounded-full bg-transparent border border-[#68005F] text-[#68005F] hover:bg-[#68005F] hover:text-white hover:-translate-y-0.5 focus-visible:ring-[#68005F]',
        ghost:
          'rounded-full bg-transparent text-[#68005F] hover:bg-[#FDEAF4] hover:text-[#A80086] focus-visible:ring-[#A80086]',
        light:
          'rounded-full bg-white text-[#3D003D] hover:bg-[#FDEAF4] hover:text-[#D91A8A] shadow-soft hover:shadow-card hover:-translate-y-0.5 focus-visible:ring-white',
        destructive:
          'rounded-full bg-[#E11D48] text-white hover:bg-[#BE123C] focus-visible:ring-[#E11D48]',
        link: 'text-[#D91A8A] underline-offset-4 hover:underline',
      },
      size: {
        default: 'text-sm px-6 py-2.5 gap-2',
        sm: 'text-xs px-4 py-1.5 gap-1.5',
        md: 'text-sm px-6 py-2.5 gap-2',
        lg: 'text-base px-8 py-3.5 gap-2.5',
        xs: 'text-xs px-3 py-1 gap-1',
        icon: 'size-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  withArrow?: boolean;
}

function Button({
  className,
  variant = 'primary',
  size = 'default',
  withArrow = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-0.5 shrink-0" />
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
