import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlowingButton } from '../components/GlowingButton';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-center items-center text-white">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
                <p className="text-lg">An innovative way to manage your transactions effortlessly.</p>
            </div>
            
            <div className="flex space-x-6">
                <GlowingButton 
                    label="Login" 
                    to={() => navigate('/signin')} 
                />
                
                <GlowingButton 
                    label="Sign Up" 
                    to={() => navigate('/signup')} 
                />
            </div>
        </div>
    );
};
