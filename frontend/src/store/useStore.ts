import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../lib/api';
import type { Note } from '../types';

interface User {
    username: string;
    userId: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isVaultPublic: boolean;
    shareId: string | null;
    shareLink: string | null;
    isShareModalOpen: boolean;
    login: (data: any) => Promise<void>;
    signup: (data: any) => Promise<any>; // Changed to return Promise<any> to catch the userId
    verifyEmail: (data: { userId: string, otp: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    toggleShare: (share: boolean) => Promise<void>;
    fetchVaultShareStatus: () => Promise<void>;
    setShareModalOpen: (open: boolean) => void;
}

interface ContentState {
    notes: Note[];
    isLoading: boolean;
    error: string | null;
    fetchNotes: () => Promise<void>;
    addNote: (note: Omit<Note, 'id' | 'date'>) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
}

interface AiState {
    aiResponse: string | null;
    references: Note[];
    isThinking: boolean;
    askAi: (query: string) => Promise<void>;
    clearAiResponse: () => void;
}

interface PublicVaultState {
    publicVault: { username: string; notes: Note[] } | null;
    isLoadingPublic: boolean;
    fetchPublicVault: (shareId: string) => Promise<void>;
}

interface AppStore extends AuthState, ContentState, AiState, PublicVaultState { }

/**
 * Normalizes backend content into FE Note structure.
 * Handles both populated and unpopulated tags.
 */
const normalizeNote = (b: any): Note => {
    return {
        id: b._id,
        type: b.type === 'youtube' ? 'video' : b.type,
        title: b.title || 'Untitled',
        content: b.link || '',
        tags: Array.isArray(b.tags)
            ? b.tags.map((t: any) => {
                if (typeof t === 'object' && t !== null && t.tagName) return t.tagName;
                if (typeof t === 'string') return t; // Might be ID, but best we can do if not populated
                return '';
            }).filter(Boolean)
            : [],
        date: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-GB') : 'N/A',
    };
};

export const useStore = create<AppStore>()(
    persist(
        (set, get) => ({
            // Auth Store
            user: null,
            isAuthenticated: false,
            isVaultPublic: false,
            shareId: null,
            shareLink: null,
            isShareModalOpen: false,

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/login', credentials);
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.message || 'Login failed');
                    }
                    set({
                        isAuthenticated: true,
                        user: { userId: response.data.userId, username: credentials.username },
                        isLoading: false
                    });
                } catch (err: any) {
                    const message = err.response?.data?.message || err.message || 'Login failed';
                    set({ error: message, isLoading: false });
                    throw err;
                } finally {
                    set({ isLoading: false });
                }
            },
            signup: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/signup', userData);
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.message || 'Signup failed');
                    }
                    // Don't set isAuthenticated here. Return userId for the verification step.
                    return response.data.userId;
                } catch (err: any) {
                    const message = err.response?.data?.message || err.message || 'Signup failed';
                    set({ error: message, isLoading: false });
                    throw err;
                } finally {
                    set({ isLoading: false });
                }
            },
            verifyEmail: async (data: { userId: string, otp: string }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/verify', data);
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.message || 'Verification failed');
                    }
                    set({
                        isAuthenticated: true,
                        user: { userId: response.data.userId, username: response.data.userName },
                        isLoading: false
                    });
                } catch (err: any) {
                    const message = err.response?.data?.message || err.message || 'Verification failed';
                    set({ error: message, isLoading: false });
                    throw err;
                } finally {
                    set({ isLoading: false });
                }
            },
            logout: async () => {
                set({ isLoading: true, error: null });
                try {
                    await api.get('/auth/logout');
                    set({ isAuthenticated: false, user: null, isVaultPublic: false, shareId: null, shareLink: null });
                } catch (err: any) {
                    set({ error: err.message || 'Logout failed' });
                } finally {
                    set({ isLoading: false });
                }
            },
            checkAuth: async () => {
                try {
                    await api.get('/content');
                    set({ isAuthenticated: true });
                } catch {
                    set({ isAuthenticated: false, user: null });
                }
            },
            toggleShare: async (share) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/share/toggle', { share });
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.message || 'Failed to toggle share');
                    }

                    if (share && response.data.publicLink) {
                        // Extract shareId from backend URL: http://localhost:3000/api/v1/share/<uuid>
                        const backendUrl = response.data.publicLink;
                        const shareId = backendUrl.split('/').pop();

                        // Generate frontend shareLink
                        const frontendBaseUrl = window.location.origin; // http://localhost:5173
                        const shareLink = `${frontendBaseUrl}/share/${shareId}`;

                        set({
                            isVaultPublic: true,
                            shareId,
                            shareLink
                        });
                    } else {
                        set({
                            isVaultPublic: false,
                            shareId: null,
                            shareLink: null
                        });
                    }
                } catch (err: any) {
                    const message = err.response?.data?.message || err.message || 'Failed to toggle share';
                    set({ error: message });
                    throw err;
                } finally {
                    set({ isLoading: false });
                }
            },
            fetchVaultShareStatus: async () => {
                try {
                    // Use dedicated share status endpoint
                    const response = await api.get('/share/status');
                    if (response.status === 200 && response.data.success) {
                        const isShared = response.data.isShared || false;
                        const backendLink = response.data.publicLink || null;

                        // Backend link format: http://localhost:3000/api/v1/share/<uuid>
                        // We need to extract the UUID and create the frontend link
                        let shareId = null;
                        let shareLink = null;

                        if (isShared && backendLink) {
                            shareId = backendLink.split('/').pop() || null;
                            if (shareId) {
                                const frontendBaseUrl = window.location.origin;
                                shareLink = `${frontendBaseUrl}/share/${shareId}`;
                            }
                        }

                        set({
                            isVaultPublic: isShared,
                            shareId,
                            shareLink
                        });
                    }
                } catch (err: any) {
                    // If endpoint fails, default to private (safe fallback)
                    console.error('Failed to fetch vault share status:', err);
                    set({
                        isVaultPublic: false,
                        shareId: null,
                        shareLink: null
                    });
                }
            },
            setShareModalOpen: (open) => set({ isShareModalOpen: open }),

            // Content Store
            notes: [],
            isLoading: false,
            error: null,
            fetchNotes: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/content');
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.message || 'Failed to fetch notes');
                    }
                    const mappedNotes = response.data.content.map(normalizeNote);
                    set({ notes: mappedNotes, isLoading: false });
                } catch (err: any) {
                    const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to fetch notes';
                    set({ error: message, isLoading: false });
                } finally {
                    set({ isLoading: false });
                }
            },
            addNote: async (newNote) => {
                set({ isLoading: true, error: null });
                try {
                    const payload = {
                        ...newNote,
                        type: newNote.type === 'video' ? 'youtube' : newNote.type,
                        link: newNote.content,
                    };
                    const response = await api.post('/content/create-content', payload);

                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.error || response.data?.message || 'Failed to create content');
                    }

                    // Crucial: Only refresh data from server after confirmed success
                    await get().fetchNotes();
                } catch (err: any) {
                    const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
                    set({ error: errorMessage });
                    throw err; // Signal failure to the UI
                } finally {
                    set({ isLoading: false });
                }
            },
            deleteNote: async (id) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get(`/content/delete-content/${id}`);
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.message || 'Failed to delete content');
                    }
                    // Update state ONLY after successful backend response
                    set((state) => ({
                        notes: state.notes.filter((n) => n.id !== id),
                    }));
                } catch (err: any) {
                    const message = err.response?.data?.message || err.message || 'Failed to delete content';
                    set({ error: message });
                    throw err;
                } finally {
                    set({ isLoading: false });
                }
            },

            // AI Store
            aiResponse: null,
            references: [],
            isThinking: false,
            askAi: async (query) => {
                set({ isThinking: true, aiResponse: null, references: [], error: null });
                try {
                    const response = await api.post('/search/ai_search', { search: query });
                    if (response.status !== 200) {
                        throw new Error('AI search failed');
                    }
                    const mappedReferences = (response.data.content || []).map(normalizeNote);
                    set({
                        aiResponse: response.data.result,
                        references: mappedReferences,
                        isThinking: false
                    });
                } catch (err: any) {
                    const message = err.response?.data?.message || err.message || 'AI search failed';
                    set({ isThinking: false, error: message });
                    throw err;
                } finally {
                    set({ isThinking: false });
                }
            },
            clearAiResponse: () => set({ aiResponse: null, references: [], error: null }),

            // Public Vault Store
            publicVault: null,
            isLoadingPublic: false,
            fetchPublicVault: async (shareId) => {
                set({ isLoadingPublic: true, error: null });
                try {
                    const response = await api.get(`/share/${shareId}`);
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error(response.data?.message || 'Failed to fetch public vault');
                    }
                    const mappedNotes = response.data.content.map(normalizeNote);
                    set({
                        publicVault: {
                            username: response.data.username,
                            notes: mappedNotes
                        },
                        isLoadingPublic: false
                    });
                } catch (err: any) {
                    const message = err.response?.data?.message || err.message || 'Failed to fetch public vault';
                    set({ error: message, isLoadingPublic: false, publicVault: null });
                    throw err;
                } finally {
                    set({ isLoadingPublic: false });
                }
            },
        }),
        {
            name: 'mindvault-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);
