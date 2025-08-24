import { create } from 'zustand';
import { User, ImageEditRequest } from '@/types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Image editing state
  currentEdit: ImageEditRequest | null;
  editHistory: ImageEditRequest[];
  isProcessing: boolean;
  
  // UI state
  activeTab: string;
  showPricing: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setCurrentEdit: (edit: ImageEditRequest | null) => void;
  addToHistory: (edit: ImageEditRequest) => void;
  setProcessing: (processing: boolean) => void;
  setActiveTab: (tab: string) => void;
  togglePricing: () => void;
  updateUserCredits: (credits: number) => void;
  
  // Payment state
  checkoutSession: string | null;
  setCheckoutSession: (sessionId: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  currentEdit: null,
  editHistory: [],
  isProcessing: false,
  activeTab: 'edit',
  showPricing: false,
  checkoutSession: null,
  
  // Actions
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
  
  setCurrentEdit: (edit) => {
    set({ currentEdit: edit });
  },
  
  addToHistory: (edit) => {
    const currentHistory = get().editHistory;
    set({ editHistory: [edit, ...currentHistory.slice(0, 49)] }); // Keep last 50 edits
  },
  
  setProcessing: (processing) => {
    set({ isProcessing: processing });
  },
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  
  togglePricing: () => {
    set((state) => ({ showPricing: !state.showPricing }));
  },
  
  updateUserCredits: (credits) => {
    const user = get().user;
    if (user) {
      set({ user: { ...user, credits } });
    }
  },
  
  setCheckoutSession: (sessionId) => {
    set({ checkoutSession: sessionId });
  },
}));