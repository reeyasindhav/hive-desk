import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const TIMER_STORAGE_KEY = "hivedesk.timer";

type TimerState = {
  isRunning: boolean;
  elapsed: number;
  startTime: number | null;
};

type TimerContextValue = {
  seconds: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

const TimerContext = createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(TIMER_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as TimerState;
        accumulatedRef.current = saved.elapsed;
        if (saved.isRunning && saved.startTime) {
          startTimeRef.current = saved.startTime;
          const elapsed = Math.floor((Date.now() - saved.startTime) / 1000) + saved.elapsed;
          setSeconds(elapsed);
          setIsRunning(true);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      const tick = () => {
        if (startTimeRef.current !== null) {
          const now = Date.now();
          setSeconds(accumulatedRef.current + Math.floor((now - startTimeRef.current) / 1000));
        }
      };
      tick();
      intervalRef.current = setInterval(tick, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        TIMER_STORAGE_KEY,
        JSON.stringify({
          isRunning,
          elapsed: accumulatedRef.current,
          startTime: startTimeRef.current,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [isRunning, seconds]);

  const start = () => {
    if (isRunning) return;
    startTimeRef.current = Date.now();
    accumulatedRef.current = seconds;
    setIsRunning(true);
  };

  const pause = () => {
    if (!isRunning || startTimeRef.current === null) return;
    accumulatedRef.current =
      accumulatedRef.current + Math.floor((Date.now() - startTimeRef.current) / 1000);
    startTimeRef.current = null;
    setIsRunning(false);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    startTimeRef.current = null;
    accumulatedRef.current = 0;
    setSeconds(0);
    setIsRunning(false);
  };

  const value = { seconds, isRunning, start, pause, reset };
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error("useTimer must be used inside TimerProvider");
  return ctx;
}

export function clearTimerStorage() {
  try {
    window.localStorage.removeItem(TIMER_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function formatTimer(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}
