import { useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthApi } from '@/api/AuthApi';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/form/input';
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";

export const Login = () => {
    const { login } = useAuth()

    const [searchParams, _] = useSearchParams()
    const redirect = searchParams.get('redirect')
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [, setErrorMessage] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')
        const emailError = verifyEmail(email)
        const passwordError = verifyPassword(password)
        if (emailError || passwordError) {
            setEmailError(emailError)
            setPasswordError(passwordError)
        } else {
            try {
                setIsLoading(true)
                const response = await AuthApi.login({ email, password })
                login(response)
                navigate(redirect || '/dashboard')
            } catch (e: any) {
                console.error(e)
                if (e?.response?.data?.detail) {
                    if (typeof e.response.data.detail === 'string')
                        setErrorMessage(e.response.data.detail)
                    else
                        setErrorMessage('An unknown error occurred')
                }
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '')
        setEmail(sanitizedValue)
        if (emailError) {
            setEmailError(verifyEmail(sanitizedValue))
        }
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(/\s/g, '')
        setPassword(sanitizedValue)
        if (passwordError) {
            setPasswordError(verifyPassword(sanitizedValue))
        }
    }

    const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        const emailError = verifyEmail(e.target.value)
        setEmailError(emailError)
    }
    const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
        const passwordError = verifyPassword(e.target.value)
        setPasswordError(passwordError)
    }
    const verifyPassword = (password: string): string => {
        if (password === '') {
            return 'Enter a password'
        } else if (password.length < 8) {
            return 'Password must be over 8 characters'
        } else {
            return ''
        }
    }
    const verifyEmail = (email: string): string => {
        if (email === '') {
            return 'Enter an email'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Enter a valid email'
        } else {
            return ''
        }
    }

    return (
        <>
            <Navbar isAuth={false}/>
            <div className="bg-background h-screen w-screen flex justify-center items-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-defaultText text-center">Login</h1>

                    <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
                        <label className="block text-defaultText font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <Input
                            value={email}
                            onChange={handleChangeEmail}
                            onBlur={handleBlurEmail}
                            disabled={isLoading}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                        // className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {emailError && (
                            <p className='text-sm text-destructive'>
                                {emailError}
                            </p>
                        )}

                        <label className="block text-defaultText font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <Input
                            value={password}
                            onChange={handleChangePassword}
                            onBlur={handleBlurPassword}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                        // className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {passwordError && (
                            <p className='text-sm text-destructive'>
                                {passwordError}
                            </p>
                        )}

                        <Button className="w-full bg-secondary text-defaultText py-2 font-bold text-lg rounded-lg">
                            Login
                        </Button>
                    </form>

                    <p className="text-defaultText text-sm mt-4">
                        Don't have an account? <a href="/register" className="text-primary hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </>
    );
};
