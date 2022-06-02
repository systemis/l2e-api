import { TestHelper } from './test.helper';

export const testHelper = new TestHelper();

jest.setTimeout(300000);

console.log('Test app controllers')
// start other tests
require('./app.e2e-spec');
