import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useStore } from '../store/useStore';
import type { Note } from '../types';

interface CreateContentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateContentModal({ isOpen, onClose }: CreateContentModalProps) {
    const { addNote } = useStore();
    const [title, setTitle] = useState('');
    const [type, setType] = useState<Note['type']>('document');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addNote({
                title,
                type,
                content,
                tags: tags.split(',').map((t) => t.trim()).filter((t) => t !== ''),
            });
            // Reset form
            setTitle('');
            setType('document');
            setContent('');
            setTags('');
            onClose();
        } catch (error) {
            console.error('Failed to create content:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#0A0A0A] rounded-2xl border-none shadow-2xl dark:shadow-none transition-colors">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">Add New Content</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title..."
                            className="rounded-xl text-black border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:ring-[#5046E4]"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type</Label>
                        <Select value={type} onValueChange={(val: any) => setType(val)}>
                            <SelectTrigger className="rounded-xl text-black border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:ring-[#5046E4]">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-[#0F0F0F] border-gray-100 dark:border-white/10 rounded-xl">
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="tweet">Tweet</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="link">Link</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Link</Label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste your content here..."
                            className="w-full text-black min-h-[100px] p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:bg-white/5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5046E4] transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="productivity, ideas, learning"
                            className="rounded-xl border-gray-200 text-black dark:border-white/10 dark:bg-white/5 dark:text-white focus:ring-[#5046E4]"
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting} className="rounded-xl dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5">Cancel</Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-[#5046E4] hover:bg-[#4338CA] text-white px-8 rounded-xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Create Content'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
