import typist from '../src/typist.js';

const string = "Hello, world!";

//Interkey Interval https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf
typist(100, 90).type( string ).to( console.log );
