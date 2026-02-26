import { Plus, Share2, Search, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useStore } from '../store/useStore';

interface TopBarProps {
    onAddClick: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

export function TopBar({ onAddClick, searchQuery, onSearchChange, isDarkMode, onToggleTheme }: TopBarProps) {
    const { setShareModalOpen } = useStore();

    return (
        <div className="h-20 flex items-center justify-between px-8 bg-[#F9FBFC] dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-white/5 transition-colors">
            <div className="flex items-center gap-6 flex-1">
                <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white whitespace-nowrap">Search</h2>
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <Input
                        className="pl-10 text-black bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-xl focus:ring-[#5046E4] h-11 dark:text-white dark:placeholder:text-gray-500"
                        placeholder="Search your notes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onToggleTheme}
                    className="rounded-xl text-black border-gray-200 dark:border-white/10 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 h-11 w-11 transition-all"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Button
                    onClick={() => setShareModalOpen(true)}
                    variant="outline"
                    className="bg-[#E0E7FF] dark:bg-indigo-500/10 border-none text-[#5046E4] dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 font-medium h-11 px-6 rounded-xl hidden sm:flex"
                >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Vault
                </Button>
                <Button
                    onClick={onAddClick}
                    className="bg-[#5046E4] hover:bg-[#4338CA] text-white font-medium h-11 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Content
                </Button>
            </div>
        </div>
    );
}
