import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { NoteCard } from '../components/NoteCard';
import { CreateContentModal } from '../components/CreateContentModal';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import type { Note } from '../types';

export default function Dashboard() {
    const navigate = useNavigate();
    const { notes, isLoading, error, fetchNotes, deleteNote, fetchVaultShareStatus } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<Note['type'] | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        const initDashboard = async () => {
            await fetchNotes();
            await fetchVaultShareStatus();
        };
        initDashboard();
    }, [fetchNotes, fetchVaultShareStatus]);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        });
    };

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            const matchesSearch =
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
                note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesType = selectedType ? note.type === selectedType : true;

            return matchesSearch && matchesType;
        });
    }, [notes, searchQuery, selectedType]);

    const handleDeleteNote = async (id: string) => {
        await deleteNote(id);
    };

    const handleAskAI = () => {
        navigate('/ask', { state: { notes: filteredNotes } });
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} h-screen font-sans selection:bg-indigo-100`}>
            <div className="flex h-full w-full bg-[#F0F2F5] dark:bg-[#0A0A0A] transition-colors duration-300">
                <Sidebar selectedType={selectedType} onTypeChange={setSelectedType} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <TopBar
                        onAddClick={() => setIsModalOpen(true)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        isDarkMode={isDarkMode}
                        onToggleTheme={toggleTheme}
                    />

                    <m.main
                        className="flex-1 overflow-y-auto p-8 bg-[#F9FBFC] dark:bg-[#030303]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="max-w-[1400px] mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            {selectedType ? `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}s` : 'All Notes'}
                                        </h1>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">You have {filteredNotes.length} items in this view</p>
                                    </div>
                                    <Button
                                        onClick={handleAskAI}
                                        variant="outline"
                                        className="gap-2 border-indigo-100 dark:border-white/10 text-[#5046E4] dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-white/5 bg-white dark:bg-white/5"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Ask AI
                                    </Button>
                                </div>
                            </div>


                            {error && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                                    <p>Error: {error}</p>
                                </div>
                            )}

                            {isLoading ? (
                                <div className="flex items-center justify-center h-[60vh]">
                                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                                </div>
                            ) : filteredNotes.length > 0 ? (
                                <m.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.1
                                            }
                                        }
                                    }}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {filteredNotes.map((note) => (
                                        <m.div
                                            key={note.id}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                                                exit: { opacity: 0, y: -20, transition: { duration: 0.25 } }
                                            }}
                                            layout
                                        >
                                            <NoteCard note={note} onDelete={handleDeleteNote} />
                                        </m.div>
                                    ))}
                                </m.div>
                            ) : (
                                <m.div
                                    className="flex flex-col items-center justify-center h-[60vh] text-center"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 border border-gray-100 dark:border-white/10">
                                        <div className="w-16 h-16 bg-white dark:bg-[#0A0A0A] rounded-2xl flex items-center justify-center shadow-lg dark:shadow-none">
                                            <Search className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No notes found</h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">Try adjusting your search or filter to find what you're looking for.</p>
                                </m.div>
                            )}
                        </div>
                    </m.main>
                </div>

                <CreateContentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div >
        </div >
    );
}
