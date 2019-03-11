import * as React from 'react';
import manageListeners from './eventListeners';
import { InactivityTrackerProps, InactivityTrackerState } from './types';

/**
 * Inactivity Tracker Component
 * @author Abhishek VG
 *
 */

class InactivityTracker extends React.Component<InactivityTrackerProps, InactivityTrackerState> {
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (prevState.count !== nextProps.count) {
      console.log('started');
      return {
        callback: nextProps.callback,
        count: nextProps.count,
        sendId: true,
        time: nextProps.time,
        type: nextProps.type
      };
    }
    // for particular instance has to delete based on the id (count)
    if (prevState.clearId !== nextProps.clearId) {
      return {
        clearId: nextProps.clearId, // when unsubscribe then instance which you r getting though action
        clearInstance: true
      };
    }
    return null;
  }

  public constructor(props: any) {
    super(props);
    this.state = {
      callback: () => {
        console.log('Called callback');
      },
      clearId: undefined,
      clearInstance: false,
      count: 0, // no of instances you have created for the setTimeout or setInterval
      loggerStack: {}, // to count the isntances and keep track of its id with type
      sendId: false,
      time: 0,
      type: ''
    };
    this.eventHandler = this.eventHandler.bind(this);
  }

  public render() {
    console.log('--->', this.state);
    return null;
  }

  public componentDidMount() {
    manageListeners(this.eventHandler, 'attach');
    // creates the logger instance if request has come
    this.createLoggerInstance();
  }

  public componentDidUpdate() {
    if (this.state.clearInstance) {
      this.unsubscribe();
    } else {
      // creates the logger instance if request has come
      this.createLoggerInstance();
    }
  }

  public componentWillUnmount() {
    manageListeners(this.eventHandler, 'detach');
    this.unsubscribeAll();
  }
  // no of instances as created for inactivitylogger when sendId is true
  private createLoggerInstance() {
    const { count, time, type, callback } = this.state;
    if (this.state.sendId) {
      const eventId = type === 'timeout' ? setTimeout(callback, time) : setInterval(callback, time);
      this.setState({
        loggerStack: {
          ...this.state.loggerStack,
          [count]: {
            callback,
            id: eventId,
            time: this.state.time,
            type: this.state.type
          }
        },
        sendId: false
      });
      this.props.returnId(count);
    }
  }

  private eventHandler() {
    this.restartAllLoggerEvents();
  }

  private restartAllLoggerEvents() {
    const loggerStack = { ...this.state.loggerStack };
    Object.keys(loggerStack).forEach((eachKey: string) => {
      const { id, type, callback, time } = loggerStack[eachKey];
      type === 'timeout' ? clearTimeout(id) : clearInterval(id);
      loggerStack[eachKey].id =
        type === 'timeout' ? setTimeout(callback, time) : setInterval(callback, time);
    });
    this.setState({ loggerStack });
  }

  private unsubscribe() {
    const { clearId } = this.state;
    const loggerStackCopy = { ...this.state.loggerStack };
    const loggerInstance = loggerStackCopy[clearId];
    if (loggerInstance.type === 'timeout') {
      clearTimeout(loggerInstance.id);
    } else {
      clearInterval(loggerInstance.id);
    }
    delete loggerStackCopy[clearId];
    this.setState({
      clearInstance: false,
      loggerStack: loggerStackCopy
    });
  }

  private unsubscribeAll() {
    Object.keys(this.state.loggerStack).forEach((countId: string) => {
      const loggerInstance = this.state.loggerStack[countId];
      if (loggerInstance.type === 'timeout') {
        clearTimeout(loggerInstance.id);
      } else {
        clearInterval(loggerInstance.id);
      }
    });
  }
}

export default InactivityTracker;
