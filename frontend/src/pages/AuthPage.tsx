import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Vault, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useStore } from '../store/useStore';

export default function AuthPage() {
    const navigate = useNavigate();
    const { login, signup, isAuthenticated } = useStore();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            if (isLogin) {
                await login({ email: formData.email, password: formData.password, username: formData.username || 'user' });
                navigate('/dashboard');
            } else {
                const userId = await signup(formData);
                navigate('/verify', { state: { userId, email: formData.email } });
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-indigo-500/30 overflow-hidden flex items-center justify-center p-6">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,70,228,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
                        <Vault className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Mind Vault</h1>
                    <p className="text-gray-500 mt-2 font-medium">Your second brain for the digital age</p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="text-gray-500 text-sm">
                            {isLogin ? 'Enter your details to access your vault.' : 'Sign up to start saving your digital life.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2"
                                >
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Username</Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <Input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder="Your name"
                                            className="h-12 pl-12 bg-white/5 border-white/10 rounded-xl focus:ring-indigo-500"
                                            required={!isLogin}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="name@example.com"
                                    className="h-12 pl-12 bg-white/5 border-white/10 rounded-xl focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="h-12 pl-12 bg-white/5 border-white/10 rounded-xl focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="w-full text-center text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </div>

                <p className="text-center mt-8 text-xs text-gray-600">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </motion.div>
        </div>
    );
}
