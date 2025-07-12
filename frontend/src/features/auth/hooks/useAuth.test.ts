import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  it('should login and set user', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.login('test@example.com', 'password');
    });
    expect(result.current.user).toEqual({ email: 'test@example.com' });
  });
}); 