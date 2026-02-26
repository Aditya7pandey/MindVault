import { MessageSquare, Sparkles, Download } from 'lucide-react';
import { Card } from './ui/card';
import { m } from 'framer-motion';

interface Step {
    number: string;
    title: string;
    description: string;
    icon: any;
}

const stepData: Step[] = [
    {
        number: '01',
        title: 'Capture Everything',
        description: 'Save notes, links, and documents from any source effortlessly.',
        icon: MessageSquare,
    },
    {
        number: '02',
        title: 'Smart Organization',
        description: 'Our AI automatically tags and relates your thoughts together.',
        icon: Sparkles,
    },
    {
        number: '03',
        title: 'Recall Instantly',
        description: 'Access your knowledge through powerful search and graph views.',
        icon: Download,
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-40 bg-[#030303] relative overflow-hidden">
            {/* Giant Purple Arc background effect */}
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[120%] aspect-square bg-gradient-to-b from-[#5046E4] via-transparent to-transparent opacity-20 blur-[120px] rounded-full z-0"></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
                <m.h2
                    className="text-4xl md:text-5xl font-bold text-white mb-24 tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    How Mind Vault works
                </m.h2>

                <m.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {stepData.map((step, idx) => (
                        <m.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                        >
                            <Card className="bg-black/40 border-white/5 backdrop-blur-3xl p-10 h-[350px] flex flex-col justify-between items-start text-left hover:border-white/20 transition-all duration-500 overflow-hidden group">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#5046E4]/20 group-hover:border-[#5046E4]/40 transition-all">
                                    <step.icon className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-4">
                                        <span className="text-sm font-black text-gray-500 bg-white/5 w-8 h-8 rounded-full flex items-center justify-center border border-white/5">{step.number}</span>
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Decorative line */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent blur-2xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
                            </Card>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </section>
    );
}
