import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles, Vault, Quote, Search, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import { NoteCard } from '../components/NoteCard';

interface Particle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
}

const ThinkingSpace = ({ isFocused, isHidden }: { isFocused: boolean; isHidden: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });
    const requestRef = useRef<number>(null);

    useEffect(() => {
        if (isHidden) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            initParticles();
        };

        const initParticles = () => {
            const count = 40;
            const newParticles: Particle[] = [];
            for (let i = 0; i < count; i++) {
                newParticles.push({
                    x: Math.random() * canvas.offsetWidth,
                    y: Math.random() * canvas.offsetHeight,
                    size: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    alpha: Math.random() * 0.3 + 0.1,
                });
            }
            particles.current = newParticles;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            particles.current.forEach((p) => {
                p.x += p.vx * (isFocused ? 1.5 : 1);
                p.y += p.vy * (isFocused ? 1.5 : 1);

                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    p.x += dx * 0.005;
                    p.y += dy * 0.005;
                }

                if (p.x < 0) p.x = canvas.offsetWidth;
                if (p.x > canvas.offsetWidth) p.x = 0;
                if (p.y < 0) p.y = canvas.offsetHeight;
                if (p.y > canvas.offsetHeight) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha * (isFocused ? 1.5 : 1)})`;
                ctx.fill();
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isFocused, isHidden]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40 transition-opacity duration-500"
            style={{ opacity: isHidden ? 0 : 0.4 }}
        />
    );
};

export default function AskPage() {
    const navigate = useNavigate();
    const { askAi, aiResponse: answer, references, isThinking, deleteNote } = useStore();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isInputActive = query.length > 0;
    const isHidden = isInputActive || isThinking || !!answer;

    const suggestions = [
        "Summarize my recent notes",
        "What are the key ideas I've saved?",
        "Explain my notes about AI agents",
        "Find connections between my startup ideas"
    ];

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleAsk = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        askAi(query);
    };

    return (
        <div className="relative min-h-screen w-full bg-[#030303] text-white font-sans selection:bg-indigo-500/30 overflow-hidden flex flex-col">
            {/* Ambient Background Animation */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,70,228,0.05),transparent_70%)]" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isThinking ? 0.4 : 0.15 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
                </motion.div>
            </div>

            {/* Header */}
            <header className="relative z-10 p-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="text-gray-400 hover:text-black transition-colors group flex items-center gap-2"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Vault
                </Button>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-12">
                <div className="w-full max-w-2xl space-y-12 relative">

                    {/* Idle Animation Space (Desktop Only) */}
                    <div className="absolute -inset-20 hidden md:block">
                        <ThinkingSpace isFocused={isFocused} isHidden={isHidden} />
                    </div>

                    {/* Centered Query Input Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center relative z-20"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        opacity: isFocused && !isHidden ? [0.1, 0.2, 0.1] : 0.1,
                                        scale: isFocused && !isHidden ? [1, 1.1, 1] : 1
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute inset-0 bg-indigo-500 blur-3xl rounded-full"
                                />
                                <Vault className="w-16 h-16 text-indigo-400/80 relative" />
                            </div>
                        </div>

                        <form onSubmit={handleAsk} className="relative group max-w-xl mx-auto">
                            <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[28px] blur transition duration-1000 ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                            <div className={`relative flex items-center bg-white/[0.03] border backdrop-blur-2xl rounded-2xl p-1.5 pl-6 transition-all shadow-2xl ${isFocused ? 'border-indigo-400/50 ring-4 ring-indigo-500/5' : 'border-white/10'}`}>
                                <Search className="w-5 h-5 text-gray-500 mr-4" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ask anything from your Mind Vault..."
                                    className="flex-1 bg-transparent border-none outline-none text-lg font-light text-white placeholder:text-gray-600 h-11"
                                    disabled={isThinking}
                                />
                                <div className="flex items-center gap-3 pr-2">
                                    <AnimatePresence>
                                        {isFocused && !isInputActive && (
                                            <motion.span
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hidden sm:block"
                                            >
                                                Press Enter
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    <Button
                                        type="submit"
                                        disabled={isThinking || !query.trim()}
                                        className="h-10 w-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-all disabled:opacity-20 flex items-center justify-center p-0"
                                    >
                                        {isThinking ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <ArrowRight className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* Suggestions & Indicator */}
                        <AnimatePresence>
                            {!isHidden && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-8 space-y-6"
                                >
                                    <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                                        {suggestions.map((suggestion, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setQuery(suggestion)}
                                                className="px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-full text-sm text-gray-400 hover:text-white transition-all duration-300"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex flex-col items-center gap-2 opacity-40">
                                        <div className="w-px h-8 bg-gradient-to-b from-transparent to-indigo-500/50" />
                                        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-indigo-400">
                                            Searching across your Mind Vault notes
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Answer Display */}
                    <AnimatePresence mode="wait">
                        {isThinking && (
                            <motion.div
                                key="thinking"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center space-y-2 py-8"
                            >
                                <div className="inline-flex gap-1.5 justify-center">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Analyzing Vault</p>
                            </motion.div>
                        )}

                        {answer && (
                            <motion.div
                                key="answer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-10 md:p-14 rounded-[32px] shadow-2xl relative overflow-hidden z-30"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Quote className="w-24 h-24" />
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                                            <Sparkles className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">AI Insight</span>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2 tracking-tight">Answer</h2>
                                    <p className="text-gray-500 font-medium text-sm">Based on your shared vault context</p>
                                </div>

                                <div className="text-gray-300 text-lg md:text-xl leading-relaxed font-light prose-invert max-w-none">
                                    <ReactMarkdown
                                        components={{
                                            p: ({ ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                                            strong: ({ ...props }) => <strong className="font-bold text-indigo-400" {...props} />,
                                            ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                                            ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                                            li: ({ ...props }) => <li className="mb-1" {...props} />,
                                            h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-4 text-white" {...props} />,
                                            h2: ({ ...props }) => <h2 className="text-xl font-bold mb-3 text-white" {...props} />,
                                            h3: ({ ...props }) => <h3 className="text-lg font-bold mb-2 text-white" {...props} />,
                                        }}
                                    >
                                        {answer}
                                    </ReactMarkdown>
                                </div>

                                {references && references.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-white/5">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Vault className="w-4 h-4 text-indigo-400" />
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Referenced from your Vault</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {references.map((ref) => (
                                                <NoteCard
                                                    key={ref.id}
                                                    note={ref}
                                                    onDelete={deleteNote}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Ambient Footer */}
            <footer className="relative z-10 py-12 flex justify-center opacity-30">
                <div className="flex items-center gap-2">
                    <Vault className="w-4 h-4" />
                    <span className="text-xs font-semibold tracking-widest uppercase">Mind Vault AI Intelligence</span>
                </div>
            </footer>
        </div>
    );
}
