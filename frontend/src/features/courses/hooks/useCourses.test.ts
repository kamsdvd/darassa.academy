import { renderHook } from '@testing-library/react';
import { useCourses } from './useCourses';

describe('useCourses', () => {
  it('should return empty courses array by default', () => {
    const { result } = renderHook(() => useCourses());
    expect(result.current.courses).toEqual([]);
  });
}); 