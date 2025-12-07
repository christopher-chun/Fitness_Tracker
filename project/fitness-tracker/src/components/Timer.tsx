import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNotification } from '../contexts/NotficationContext';

type TimerProps = {
  initialSeconds?: number;
  onComplete?: () => void;
};

export default function Timer({ initialSeconds = 60, onComplete }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationIdRef = useRef<string | null>(null);
  const endTimeRef = useRef<number | null>(null); // used to track end time and remaining time so the timer and notification stay in sync
  const { scheduleTimerNotification, cancelNotification } = useNotification();

  // reset timer when initialSeconds prop changes
  useEffect(() => {
    setSeconds(initialSeconds);
    setIsRunning(false);
    endTimeRef.current = null;
  }, [initialSeconds]);

  // handle timer countdown
  useEffect(() => {
    if (isRunning && endTimeRef.current) {
      intervalRef.current = setInterval(() => {
        // calculate remaining time
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTimeRef.current! - now) / 1000));
        setSeconds(remaining);
        if (remaining <= 0) {
          handleComplete();
        }
      }, 100);
    } else if (intervalRef.current) { // clear interval when paused or completed
        clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleComplete = () => {
    setIsRunning(false);
    endTimeRef.current = null;
    if (onComplete) {
      onComplete();
    }
  };

  const startTimer = async () => {
    if (seconds > 0) {
      setIsRunning(true);
      // calculate end time
      endTimeRef.current = Date.now() + seconds * 1000;
      // schedule notification for timer completion
      const id = await scheduleTimerNotification(seconds);
      notificationIdRef.current = id;
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    endTimeRef.current = null;
    // cancel scheduled notification when paused
    if (notificationIdRef.current) {
      cancelNotification(notificationIdRef.current);
      notificationIdRef.current = null;
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
    endTimeRef.current = null;
    // cancel scheduled notification when reset
    if (notificationIdRef.current) {
      cancelNotification(notificationIdRef.current);
      notificationIdRef.current = null;
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    // format as MM:SS
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(seconds)}</Text>
      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={startTimer}
            disabled={seconds === 0}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={pauseTimer}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
