import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// function from shadcn to properly combine tailwind classnames
// this is useful for when we create reusable components
// https://github.com/shadcn-ui/ui/blob/main/apps/www/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
