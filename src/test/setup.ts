import { beforeAll, vi } from 'vitest';

// Global test setup
beforeAll(() => {
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  vi.stubGlobal('localStorage', localStorageMock);

  // Mock confirm
  vi.stubGlobal('confirm', vi.fn());

  // Mock indexedDB if needed
  // Add other global mocks as needed
});