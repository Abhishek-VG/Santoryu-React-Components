/**
 * Inactivity Tracker Component
 * <(-|-)>
 * @author Abhishek VG
 *   |@|
 * |||||||
 */

export interface InactivityTrackerProps {
  count: number;
  clearId?: any;
  callback: () => any | null;
  type: string;
  time: number;
  returnId: (count: number) => any;
}

export interface InactivityTrackerState {
  loggerStack: { [val: string]: ILoggerStack };
  count: number;
  callback: () => any | null;
  clearInstance: boolean;
  clearId: any;
  time: number;
  sendId: boolean;
  type: string;
}

export interface ILoggerStack {
  id: number;
  time: number;
  callback: () => any | null;
  type: 'timeout' | 'interval';
}
