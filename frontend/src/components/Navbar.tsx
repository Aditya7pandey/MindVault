import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Vault } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-[#5046E4] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        <Vault className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Mind Vault</span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
                    <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How it Works</a>
                    {/* <a href="#about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</a> */}
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5">
                            Sign in
                        </Button>
                    </Link>
                    <Link to="/dashboard">
                        <Button className="bg-[#5046E4] hover:bg-[#4338CA] text-white px-6 rounded-full font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                            Try Now
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
