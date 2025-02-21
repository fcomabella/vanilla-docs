import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import { server } from '@__tests__/server';

expect.extend(matchers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
