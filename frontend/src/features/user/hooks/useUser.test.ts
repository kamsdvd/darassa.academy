import { renderHook } from '@testing-library/react';
import { useUser } from './useUser';

describe('useUser', () => {
  it('should return null user by default', () => {
    const { result } = renderHook(() => useUser());
    expect(result.current.user).toBeNull();
  });
}); 