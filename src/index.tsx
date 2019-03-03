import * as React from 'react';
import * as ReactDOM from 'react-dom';

const number: string = 'YES I AM STRING';
const a = ['7', 9, 0, 5];
const A = () => <h1>Hello world {number}</h1>;
ReactDOM.render(<A />, document.getElementById('root'));
