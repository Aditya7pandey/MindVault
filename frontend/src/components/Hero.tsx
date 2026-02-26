import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

interface HeroContent {
    title: string;
    subtitle: string;
    primaryCTA: string;
    secondaryCTA: string;
}

const content: HeroContent = {
    title: "From Information to Insight in Seconds",
    subtitle: "Capture ideas. Organize knowledge. Recall anything instantly.",
    primaryCTA: "Build Your Mind Vault",
    secondaryCTA: "Explore Features",
};

export function Hero() {
    return (
        <section className="relative pt-44 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 grid-overlay z-0 opacity-40"></div>
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[140%] h-[100%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent z-0 blur-3xl pointer-events-none"></div>

            <m.div
                className="max-w-[1200px] mx-auto text-center relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3, ease: "easeInOut" }}
            >
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-10 max-w-5xl mx-auto drop-shadow-2xl">
                    {content.title}
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
                    {content.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
                    <Link to="/auth">
                        <Button className="bg-[#5046E4] hover:bg-[#4338CA] text-white text-lg h-14 px-10 rounded-xl font-bold shadow-2xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            {content.primaryCTA}
                        </Button>
                    </Link>
                    <Button onClick={() => window.scrollTo({ top: document.getElementById('features')!.offsetTop, behavior: 'smooth' })} variant="outline" className="text-lg h-14 px-10 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all active:scale-[0.98]">
                        {content.secondaryCTA}
                    </Button>
                </div>
            </m.div>

            {/* Hero Visual Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent z-20"></div>
        </section>
    );
}
