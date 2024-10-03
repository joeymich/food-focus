import * as React from 'react'

import { cn } from '@/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                className={cn(
                    'flex w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
