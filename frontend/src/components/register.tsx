import React, { useState } from 'react';
import { Button } from './ui/button';
import { Navbar } from './ui/Navbar';

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <Navbar />
            
            <div className="bg-background min-h-screen flex flex-col justify-center items-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-4xl font-bold text-defaultText text-center">Register</h2>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-defaultText font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-defaultText font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-defaultText font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full text-defaultText bg-secondary p-3 rounded-lg font-bold text-xl">
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
