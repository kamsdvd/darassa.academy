import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
};

export default config; 