import { useState, useEffect, useCallback } from 'react';

export interface Progress {
  completedProblems: Record<string, boolean>;
  currentDay: number;
  totalStudyMinutes: number;
  lastAccessDate: string;
  streakDays: number;
}

const STORAGE_KEY = 'photory-progress';

const defaultProgress: Progress = {
  completedProblems: {},
  currentDay: 1,
  totalStudyMinutes: 0,
  lastAccessDate: '',
  streakDays: 0,
};

function loadProgress(): Progress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultProgress, ...JSON.parse(saved) };
  } catch {
    // ignore
  }
  return { ...defaultProgress };
}

function calcStreak(prev: Progress): Progress {
  const today = new Date().toISOString().slice(0, 10);
  if (prev.lastAccessDate === today) return prev;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streakDays = prev.lastAccessDate === yesterday ? prev.streakDays + 1 : 1;
  return { ...prev, lastAccessDate: today, streakDays };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    setProgress((p) => calcStreak(p));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeProblem = useCallback((key: string) => {
    setProgress((p) => ({
      ...p,
      completedProblems: { ...p.completedProblems, [key]: true },
    }));
  }, []);

  const uncompleteProblem = useCallback((key: string) => {
    setProgress((p) => {
      const next = { ...p.completedProblems };
      delete next[key];
      return { ...p, completedProblems: next };
    });
  }, []);

  const setCurrentDay = useCallback((day: number) => {
    setProgress((p) => ({ ...p, currentDay: day }));
  }, []);

  const getCompletedCountForDay = useCallback(
    (day: number) => {
      return Object.keys(progress.completedProblems).filter(
        (k) => k.startsWith(`day${day}-`)
      ).length;
    },
    [progress.completedProblems]
  );

  const totalCompleted = Object.keys(progress.completedProblems).length;

  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
  }, []);

  return {
    progress,
    completeProblem,
    uncompleteProblem,
    setCurrentDay,
    getCompletedCountForDay,
    totalCompleted,
    resetProgress,
  };
}
