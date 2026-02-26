import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Vault, Loader2 } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';
import { useStore } from '../store/useStore';

export default function PublicVaultPage() {
    const { shareId } = useParams<{ shareId: string }>();
    const { publicVault, isLoadingPublic, fetchPublicVault } = useStore();
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        if (shareId) {
            fetchPublicVault(shareId).catch((err) => {
                if (err.response?.status === 404) {
                    setError('Vault Not Found');
                } else {
                    setError('Failed to load vault');
                }
            });
        }
    }, [shareId, fetchPublicVault]);

    if (isLoadingPublic) {
        return (
            <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-sans`}>
                <div className="min-h-screen bg-[#F9FBFC] dark:bg-[#030303] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading vault...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !publicVault) {
        return (
            <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-sans`}>
                <div className="min-h-screen bg-[#F9FBFC] dark:bg-[#030303] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6 text-center max-w-md">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center border border-gray-100 dark:border-white/10">
                            <div className="w-16 h-16 bg-white dark:bg-[#0A0A0A] rounded-2xl flex items-center justify-center shadow-lg dark:shadow-none">
                                <Vault className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {error === 'Vault Not Found' ? 'Vault Not Found' : 'Error Loading Vault'}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {error === 'Vault Not Found'
                                    ? 'This vault does not exist or is no longer shared.'
                                    : 'Something went wrong while loading this vault.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-sans selection:bg-indigo-100`}>
            <div className="min-h-screen bg-[#F9FBFC] dark:bg-[#030303]">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-[#F9FBFC]/80 dark:bg-[#030303]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                    <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#5046E4] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Vault className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {publicVault.username}'s Mind Vault
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    Public Vault • {publicVault.notes.length} items
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="max-w-[1400px] mx-auto px-8 py-12">
                    {publicVault.notes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {publicVault.notes.map((note) => (
                                <NoteCard key={note.id} note={note} mode="public" />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 border border-gray-100 dark:border-white/10">
                                <div className="w-16 h-16 bg-white dark:bg-[#0A0A0A] rounded-2xl flex items-center justify-center shadow-lg dark:shadow-none">
                                    <Vault className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No content yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                This vault is empty. Check back later for updates.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
