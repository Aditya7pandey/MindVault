import { Trash2, FileText, Youtube, Twitter, Link as LinkIcon, Copy, Check, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import type { Note } from '../types';

interface NoteCardProps {
    note: Note;
    onDelete?: (id: string) => void;
    mode?: 'private' | 'public';
}

const typeIcons = {
    document: FileText,
    video: Youtube,
    tweet: Twitter,
    link: LinkIcon,
};

const getYoutubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
        ? `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`
        : null;
};

export function NoteCard({ note, onDelete, mode = 'private' }: NoteCardProps) {
    const Icon = typeIcons[note.type];
    const [copied, setCopied] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);

    useEffect(() => {
        if ((note.type === 'link' || note.type === 'tweet') && note.content) {
            const fetchPreview = async () => {
                setIsLoadingPreview(true);
                try {
                    const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(note.content)}`);
                    const data = await response.json();
                    if (data.status === 'success' && data.data.image?.url) {
                        setPreviewImage(data.data.image.url);
                    }
                } catch (error) {
                    console.error('Failed to fetch link preview:', error);
                } finally {
                    setIsLoadingPreview(false);
                }
            };
            fetchPreview();
        }
    }, [note.type, note.content]);

    const handleCopy = () => {
        navigator.clipboard.writeText(note.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const youtubeThumbnail = note.type === 'video' ? getYoutubeThumbnail(note.content) : null;

    return (
        <Card className="bg-white dark:bg-[#0F0F0F] border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md dark:shadow-none transition-all group rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between p-5 pb-2">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                        <Icon className="w-5 h-5 group-hover:text-[#5046E4] dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 transition-colors">{note.title}</h3>
                </div>
                {mode === 'private' && onDelete && (
                    <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                        <button onClick={() => onDelete(note.id)} className="hover:text-red-500 transition-colors p-1">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </CardHeader>

            <CardContent className="p-5 pt-3">
                {note.type === 'video' && youtubeThumbnail ? (
                    <div className="w-full aspect-video rounded-xl mb-4 overflow-hidden border border-gray-100 dark:border-white/5 relative group/thumb">
                        <img src={youtubeThumbnail} alt={note.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/0 transition-colors flex items-center justify-center">
                            <div className="w-10 h-10 bg-white/90 dark:bg-black/80 rounded-full flex items-center justify-center shadow-lg">
                                <Youtube className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                    </div>
                ) : (note.type === 'link' || note.type === 'tweet') && (previewImage || isLoadingPreview) ? (
                    <div className="w-full aspect-video rounded-xl mb-4 overflow-hidden border border-gray-100 dark:border-white/5 relative group/thumb bg-gray-50 dark:bg-white/5">
                        {isLoadingPreview ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                            </div>
                        ) : (
                            <>
                                <img src={previewImage!} alt={note.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 group-hover/thumb:bg-black/0 transition-colors flex items-center justify-center">
                                    <div className="w-10 h-10 bg-white/90 dark:bg-black/80 rounded-full flex items-center justify-center shadow-lg">
                                        {note.type === 'tweet' ? <Twitter className="w-5 h-5 text-blue-400" /> : <ExternalLink className="w-5 h-5 text-indigo-500" />}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : note.type === 'video' ? (
                    <div className="w-full aspect-video bg-gray-50 dark:bg-white/5 rounded-xl mb-4 flex items-center justify-center border border-gray-100 dark:border-white/5">
                        <div className="w-12 h-12 bg-white dark:bg-[#0F0F0F] rounded-full flex items-center justify-center shadow-sm">
                            <Youtube className="w-6 h-6 text-red-500" />
                        </div>
                    </div>
                ) : null}

                <div className="flex flex-col gap-3 mb-6">
                    {note.type === 'document' ? (
                        <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed text-sm max-h-[100px] overflow-hidden">
                            {note.content.length > 150 ? note.content.substring(0, 150) + '...' : note.content}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs italic bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                            {note.type === 'video' ? 'YouTube Video Content' : note.type === 'tweet' ? 'Twitter Content' : 'External Link Content'}
                        </div>
                    )}

                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 transition-colors w-fit px-1"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3" />
                                <span>Copied Link</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Source Link</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                    {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-indigo-50 dark:bg-indigo-500/10 text-[#5046E4] dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border-none font-medium px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider transition-colors">
                            #{tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="px-5 py-4 border-t border-gray-50 dark:border-white/5 text-gray-400 dark:text-gray-600 text-[10px] font-medium uppercase tracking-widest transition-colors">
                Added on {note.date}
            </CardFooter>
        </Card>
    );
}
