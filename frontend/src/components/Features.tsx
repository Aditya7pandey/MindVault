import { Zap, Brain, Search, Share2 } from "lucide-react";
import { Card } from "./ui/card";
import { m } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: any;
  color: string;
  span: string;
}

const featureData: Feature[] = [
  {
    title: "Personal Knowledge",
    description: "Capture everything you learn. Organize it your way.",
    icon: Brain,
    color: "bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600",
    span: "md:col-span-3 h-[400px]",
  },
  {
    title: "Quick Capture",
    description:
      "Save tweets, articles, and snippets instantly with one click.",
    icon: Zap,
    color: "bg-purple-600/20 text-purple-400 group-hover:bg-purple-600",
    span: "md:col-span-3 h-[400px]",
  },
  {
    title: "Instant Search",
    description:
      "Find any note or link across your entire brain in milliseconds.",
    icon: Search,
    color: "bg-blue-600/20 text-blue-400 group-hover:bg-blue-600",
    span: "md:col-span-4 h-[300px] flex-row",
  },
  {
    title: "Share Brain",
    description: "Publish your base.",
    icon: Share2,
    color: "bg-violet-600/20 text-violet-400 group-hover:bg-violet-600",
    span: "md:col-span-2 h-[300px]",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-32 px-6 bg-[#030303] relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        <m.h2
          className="text-4xl md:text-5xl font-bold text-white mb-24 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Smart Features Designed for{" "}
          <span className="text-[#5046E4]">Thinking.</span>
        </m.h2>

        <m.div
          className="grid grid-cols-1 md:grid-cols-6 gap-6 text-left"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {featureData.map((feature, idx) => (
            <m.div
              key={idx}
              className={feature.span}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Card
                className={`h-full bg-white/[0.03] border-white/5 backdrop-blur-3xl p-10 flex flex-col justify-between hover:bg-white/[0.05] transition-all group overflow-hidden`}
              >
                <div
                  className={
                    feature.span.includes("flex-row")
                      ? "flex items-center gap-10"
                      : ""
                  }
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 border border-white/5 transition-colors shrink-0 ${feature.color}`}
                  >
                    <feature.icon className="w-8 h-8 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
              </Card>
            </m.div>
          ))}

          {/* <m.div
            className="md:col-span-6 bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 flex items-center justify-around text-center hover:bg-white/[0.05] transition-all"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1 },
            }}
          >
            <div>
              <div className="text-5xl font-bold text-indigo-400 mb-2">
                10k+
              </div>
              <div className="text-gray-500 font-medium uppercase tracking-widest text-xs">
                notes created daily
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
            <div>
              <div className="text-5xl font-bold text-purple-400 mb-2">
                99.9%
              </div>
              <div className="text-gray-500 font-medium uppercase tracking-widest text-xs">
                uptime guarantee
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
            <div>
              <div className="text-5xl font-bold text-blue-400 mb-2">
                End-to-End
              </div>
              <div className="text-gray-500 font-medium uppercase tracking-widest text-xs">
                encryption
              </div>
            </div>
          </m.div> */}
        </m.div>
      </div>
    </section>
  );
}
