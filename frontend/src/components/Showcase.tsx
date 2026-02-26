import { m, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function Showcase() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 }); // Trigger when 50% visible

    useEffect(() => {
        if (videoRef.current) {
            if (isInView) {
                videoRef.current.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView]);

    return (
        <section className="py-20 bg-[#030303] px-6 relative overflow-hidden">
            <m.div
                className="max-w-[1200px] mx-auto text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 tracking-tight">Visualize the Possibilities</h2>

                <div className="relative mx-auto max-w-[1000px] rounded-[2.5rem] border border-white/10 p-4 bg-white/5 backdrop-blur-3xl shadow-[0_0_100px_rgba(80,70,228,0.15)] overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Demo Video */}
                    <m.div
                        ref={containerRef}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-[#0A0A0A] rounded-[2rem] border border-white/10 aspect-[16/9] flex items-center justify-center overflow-hidden relative group/video"
                    >
                        <m.video
                            ref={videoRef}
                            src="/demo.mp4"
                            muted={isMuted}
                            loop
                            playsInline
                            controls={false}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            preload="metadata"
                        />

                        {/* Audio Control */}
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="absolute bottom-6 right-6 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/video:opacity-100 transform translate-y-2 group-hover/video:translate-y-0 duration-300"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                    </m.div>

                    {/* Decorative Floaties */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none"></div>
                </div>
            </m.div>
        </section>
    );
}
