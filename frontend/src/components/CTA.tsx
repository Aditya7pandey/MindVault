import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

export function CTA() {
    return (
        <section className="py-40 bg-[#030303] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#5046E4]/20 via-transparent to-transparent blur-[100px] z-0"></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <m.div
                    className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 rounded-[3rem] p-16 md:p-32 text-center backdrop-blur-3xl overflow-hidden relative shadow-[0_0_80px_rgba(80,70,228,0.1)]"
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Animated Glow in Corner */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#5046E4]/20 rounded-full blur-[80px] -mr-40 -mt-40 animate-pulse"></div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tight leading-tight">
                        Ready to supercharge <br /> your <span className="text-[#5046E4]">intelligence?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto font-light">
                        Build your professional knowledge archive. Join thinkers and creators already using Mind Vault.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                        <Link to="/dashboard">
                            <Button className="bg-[#5046E4] hover:bg-[#4338CA] text-white text-xl h-16 px-12 rounded-xl font-bold shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95">
                                Start for Free
                            </Button>
                        </Link>
                        <Button variant="outline" className="text-xl h-16 px-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all active:scale-95">
                            Support
                        </Button>
                    </div>

                    {/* <p className="mt-10 text-gray-500 font-medium">No credit card required • Securely cloud-synced</p> */}
                </m.div>
            </div>
        </section>
    );
}
