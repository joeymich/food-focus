import React, { useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom'
import { BiError } from 'react-icons/bi';

import { AuthApi } from '@/api/AuthApi';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/form/input';
import { Button } from './ui/button';
import { Navbar } from './ui/Navbar';

export const Register = () => {
    const { login } = useAuth()

    const [searchParams, _] = useSearchParams()
    const redirect = searchParams.get('redirect')
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

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
                const response = await AuthApi.register({ email, password })
                login(response)
                setErrorMessage('')
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
            <Navbar />

            <div className="bg-background min-h-screen flex flex-col justify-center items-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-4xl font-bold text-defaultText text-center">Register</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-defaultText font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChangeEmail}
                                onBlur={handleBlurEmail}
                                disabled={isLoading}
                                // className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your email"
                                required
                            />
                            {emailError && (
                                <p className='text-sm text-destructive'>
                                    {emailError}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-defaultText font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChangePassword}
                                onBlur={handleBlurPassword}
                                disabled={isLoading}
                                // className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your password"
                                required
                            />
                            {passwordError && (
                                <p className='text-sm text-destructive'>
                                    {passwordError}
                                </p>
                            )}
                        </div>
                        {errorMessage && (
                            <div className='flex items-center gap-x-2 rounded-lg bg-destructive/20 px-3 py-2 text-sm font-semibold text-destructive'>
                                <BiError className='text-destructive' />
                                <p>{errorMessage}</p>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full text-defaultText bg-secondary p-3 rounded-lg font-bold text-xl"
                            isLoading={isLoading}
                        >
                            Register
                        </Button>
                    </form>

                    <p className="text-defaultText text-center">
                        Already have an account? <a href="/login" className="text-primary hover:underline">Login here</a>
                    </p>
                </div>
            </div>
        </>
    );
};
