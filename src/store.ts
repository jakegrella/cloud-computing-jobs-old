import create from "zustand";

interface State {
  isMenuVisible: boolean;
  setIsMenuVisible: (isVisible: boolean) => void;
}

export const useStore = create<State>()((set) => ({
  isMenuVisible: false,
  setIsMenuVisible: (isMenuVisible) => set(() => ({ isMenuVisible })),
}));
