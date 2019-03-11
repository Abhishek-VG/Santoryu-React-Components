import * as React from 'react';
import InactivityTracker from '../../components/inactivityTracker/inactivityTracker';

export default class InactivityTrackerDemonstration extends React.Component<any, any> {
  public render() {
    return (
      <InactivityTracker
        count={1}
        time={1000}
        callback={this.callBack}
        type={'timeout'}
        returnId={this.getReturnId}
      />
    );
  }
  private callBack() {
    console.log('called');
  }
  private getReturnId(id: number) {
    console.log('return id', id);
  }
}
