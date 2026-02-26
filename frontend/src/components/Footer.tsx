import { Github, Twitter, Linkedin, Vault } from 'lucide-react';

export function Footer() {
    return (
        <footer className="py-20 bg-[#030303] border-t border-white/5 relative items-center justify-center">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-[#5046E4] rounded-lg flex items-center justify-center">
                            <Vault className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Mind Vault</span>
                    </div>
                    <p className="text-gray-500 mb-8 max-w-xs leading-relaxed">
                        The ultimate productivity tool for modern thinkers. Capture, organize, and retrieve your digital knowledge base.
                    </p>
                    <div className="flex items-center gap-5 text-gray-500">
                        <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                        <Github className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                        <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Product</h4>
                    <ul className="space-y-4 text-gray-500">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Resources</h4>
                    <ul className="space-y-4 text-gray-500">
                        <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Company</h4>
                    <ul className="space-y-4 text-gray-500">
                        <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between text-gray-600 text-sm">
                <p>© 2024 Mind Vault Inc. All rights reserved.</p>
                <div className="flex gap-10 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
}
