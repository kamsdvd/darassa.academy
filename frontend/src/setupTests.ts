import '@testing-library/jest-dom';

// Mock de l'IntersectionObserver pour les tests JSDOM
const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);