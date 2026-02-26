import { Vault, Twitter, Youtube, FileText, Link as LinkIcon, Hash, LogOut, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import type { Note } from '../types';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    selectedType: string | null;
    onTypeChange: (type: Note['type'] | null) => void;
}

const navItems = [
    { icon: Twitter, label: 'Tweets', type: 'tweet' as const },
    { icon: Youtube, label: 'Videos', type: 'video' as const },
    { icon: FileText, label: 'Documents', type: 'document' as const },
    { icon: LinkIcon, label: 'Links', type: 'link' as const },
    { icon: Hash, label: 'Tags', type: null },
];

export function Sidebar({ selectedType, onTypeChange }: SidebarProps) {
    const { logout, setShareModalOpen } = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="w-[260px] bg-white dark:bg-[#0A0A0A] h-full flex flex-col p-4 border-r border-gray-100 dark:border-white/5 transition-colors">
            <div className="flex items-center gap-3 px-4 py-6 mb-4">
                <Vault className="w-8 h-8 text-[#5046E4] dark:text-indigo-500" />
                <h1 className="text-xl font-bold text-[#1F2937] dark:text-white transition-colors">Mind Vault</h1>
            </div>

            <nav className="flex-1 space-y-1">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-4 px-4 py-6 text-lg transition-colors overflow-hidden",
                        selectedType === null
                            ? "text-[#5046E4] bg-[#F3F4F6] dark:bg-white/5 dark:text-indigo-400"
                            : "text-[#4B5563] dark:text-gray-400 hover:text-[#5046E4] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-white/5"
                    )}
                    onClick={() => onTypeChange(null)}
                >
                    <Vault className="w-5 h-5 flex-shrink-0" />
                    <span>All Notes</span>
                </Button>

                {navItems.map((item) => (
                    <Button
                        key={item.label}
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-4 px-4 py-6 text-lg transition-colors overflow-hidden",
                            selectedType === item.type && item.type !== null
                                ? "text-[#5046E4] bg-[#F3F4F6] dark:bg-white/5 dark:text-indigo-400"
                                : "text-[#4B5563] dark:text-gray-400 hover:text-[#5046E4] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-white/5"
                        )}
                        onClick={() => item.type !== null && onTypeChange(item.type)}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </nav>

            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5 space-y-2">
                <Button
                    variant="outline"
                    onClick={() => setShareModalOpen(true)}
                    className="w-full justify-start gap-4 px-4 py-4 text-[#5046E4] dark:text-indigo-400 border-white/10 hover:bg-white/5 transition-colors"
                >
                    <Share2 className="w-5 h-5 flex-shrink-0" />
                    <span>Share Vault</span>
                </Button>
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start gap-4 px-4 py-4 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span>Logout</span>
                </Button>
            </div>
        </div>
    );
}
