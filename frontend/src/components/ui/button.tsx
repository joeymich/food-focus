import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/utils/cn'
import { Spinner } from '@/components/ui/spinner'

/*
  buttonVariants and Button design from shadcn
  https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/button.tsx
*/

export const buttonVariants = cva(
  'flex gap-x-2 items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 px-4 py-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
      variants: {
          variant: {
              default:
                  'bg-primary text-primary-foreground shadow hover:opacity-80',
              destructive:
                  'bg-destructive text-destructive-foreground hover:bg-destructive/80',
              outline:
                  'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
              secondary:
                  'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
              ghost: 'hover:bg-accent hover:text-accent-foreground',
              link: 'text-primary underline-offset-4 hover:underline',
          },
          size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
          },
      },
      defaultVariants: {
          variant: 'default',
          size: "default",
      },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        isLoading?: boolean
        icon?: React.ReactNode
        asChild?: boolean
    }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
      { className, variant, isLoading, size, icon, asChild, children, ...props },
      ref
  ) => {
      const Comp = asChild ? Slot : 'button'
      return (
          <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
          >
              {isLoading && <Spinner />}
              {!isLoading && icon && <span>{icon}</span>}
              {children}
          </Comp>
      )
  }
)