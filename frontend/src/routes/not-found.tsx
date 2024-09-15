import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

// 404 not found page design from tailwind ui free
// https://tailwindui.com/components/marketing/feedback/404-pages
export const NotFound = () => {
    return (
        <main className="grid place-items-center bg-app-background px-6 py-24 sm:py-32 lg:px-8 min-h-full">
            <div className="text-center">
                <p className="text-base font-semibold text-primary">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-muted-foreground">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to="/">
                        <Button className=''>
                            Go back home
                        </Button>
                    </Link>
                    <Button
                        variant='ghost'
                    >
                        Contact support <span aria-hidden='true'>&rarr;</span>
                    </Button>
                </div>
            </div>
        </main>
    )
}