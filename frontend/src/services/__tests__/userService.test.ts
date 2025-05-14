import axios from 'axios';
import { UserService } from '../userService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = UserService.getInstance();
    jest.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = UserService.getInstance();
    const instance2 = UserService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should fetch users with default params', async () => {
    const mockResponse = {
      data: [
        { id: '1', name: 'User 1', email: 'user1@example.com' },
        { id: '2', name: 'User 2', email: 'user2@example.com' },
      ],
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getUsers();

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/users', { params: undefined });
    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch users with filters', async () => {
    const mockResponse = {
      data: [
        { id: '1', name: 'User 1', email: 'user1@example.com', role: 'admin' },
      ],
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const params = {
      role: 'admin',
      search: 'User 1',
    };

    const result = await service.getUsers(params);

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/users', { params });
    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch user by id', async () => {
    const mockResponse = {
      data: { id: '1', name: 'User 1', email: 'user1@example.com' },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getUserById('1');

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/users/1');
    expect(result).toEqual(mockResponse.data);
  });

  it('should create user', async () => {
    const mockUser = { name: 'New User', email: 'newuser@example.com' };
    const mockResponse = {
      data: { id: '1', ...mockUser },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await service.createUser(mockUser);

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/users', mockUser);
    expect(result).toEqual(mockResponse.data);
  });

  it('should update user', async () => {
    const mockUser = { name: 'Updated User', email: 'updated@example.com' };
    const mockResponse = {
      data: { id: '1', ...mockUser },
    };

    mockedAxios.put.mockResolvedValue(mockResponse);

    const result = await service.updateUser('1', mockUser);

    expect(mockedAxios.put).toHaveBeenCalledWith('/api/users/1', mockUser);
    expect(result).toEqual(mockResponse.data);
  });

  it('should delete user', async () => {
    mockedAxios.delete.mockResolvedValue({ data: undefined });

    await service.deleteUser('1');

    expect(mockedAxios.delete).toHaveBeenCalledWith('/api/users/1');
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    mockedAxios.get.mockRejectedValue(error);

    await expect(service.getUsers()).rejects.toThrow('Network error');
  });
}); 