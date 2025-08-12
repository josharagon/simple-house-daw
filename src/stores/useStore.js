import { create } from 'zustand';

const STEP_COUNT = 16;

export const useStore = create((set, get) => ({
  bpm: 120,
  steps: Array(STEP_COUNT).fill(false),
  isPlaying: false,
  toggleStep: (index) =>
    set((state) => {
      const steps = [...state.steps];
      steps[index] = !steps[index];
      return { steps };
    }),
  setBpm: (bpm) => set({ bpm }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  reset: () => set({ steps: Array(STEP_COUNT).fill(false) }),
}));

export const stepCount = STEP_COUNT;
