import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers } from '../useUsers';
import { UserService } from '../../services/userService';

// Mock du service
jest.mock('../../services/userService');

describe('useUsers', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('should fetch users with default params', async () => {
    const mockUsers = [
      { id: '1', name: 'User 1', email: 'user1@example.com' },
      { id: '2', name: 'User 2', email: 'user2@example.com' },
    ];

    (UserService.getInstance().getUsers as jest.Mock).mockResolvedValue(mockUsers);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.getUsers();
    });

    expect(result.current.getUsers().data).toEqual(mockUsers);
  });

  it('should fetch users with filters', async () => {
    const mockUsers = [
      { id: '1', name: 'User 1', email: 'user1@example.com', role: 'admin' },
    ];

    (UserService.getInstance().getUsers as jest.Mock).mockResolvedValue(mockUsers);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.getUsers({
        role: 'admin',
        search: 'User 1',
      });
    });

    expect(UserService.getInstance().getUsers).toHaveBeenCalledWith({
      role: 'admin',
      search: 'User 1',
    });
  });

  it('should fetch user by id', async () => {
    const mockUser = { id: '1', name: 'User 1', email: 'user1@example.com' };
    (UserService.getInstance().getUserById as jest.Mock).mockResolvedValue(mockUser);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.getUserById('1');
    });

    expect(UserService.getInstance().getUserById).toHaveBeenCalledWith('1');
  });

  it('should handle user creation', async () => {
    const mockUser = { name: 'New User', email: 'newuser@example.com' };
    (UserService.getInstance().createUser as jest.Mock).mockResolvedValue({ id: '1', ...mockUser });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.createUser().mutateAsync(mockUser);
    });

    expect(UserService.getInstance().createUser).toHaveBeenCalledWith(mockUser);
  });

  it('should handle user update', async () => {
    const mockUser = { name: 'Updated User', email: 'updated@example.com' };
    (UserService.getInstance().updateUser as jest.Mock).mockResolvedValue({ id: '1', ...mockUser });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.updateUser().mutateAsync({
        id: '1',
        data: mockUser,
      });
    });

    expect(UserService.getInstance().updateUser).toHaveBeenCalledWith('1', mockUser);
  });

  it('should handle user deletion', async () => {
    (UserService.getInstance().deleteUser as jest.Mock).mockResolvedValue(undefined);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.deleteUser().mutateAsync('1');
    });

    expect(UserService.getInstance().deleteUser).toHaveBeenCalledWith('1');
  });
}); 