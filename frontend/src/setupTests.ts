// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock axios to prevent SyntaxError: Cannot use import statement outside a module
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  },
}));

// Mock @mui/icons-material to prevent "Cannot find module" errors during tests
jest.mock('@mui/icons-material', () => ({
  __esModule: true,
  ...new Proxy({}, {
    get: (target, name) => {
      if (name === '__esModule') {
        return true;
      }
      return () => `Mock${String(name)}Icon`;
    },
  }),
}));

