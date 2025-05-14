import axios from 'axios';
import { FormationService } from '../formationService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FormationService', () => {
  let service: FormationService;

  beforeEach(() => {
    service = FormationService.getInstance();
    jest.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = FormationService.getInstance();
    const instance2 = FormationService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should fetch formations with default params', async () => {
    const mockResponse = {
      data: {
        data: [
          { id: '1', title: 'Formation 1' },
          { id: '2', title: 'Formation 2' },
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 2,
          itemsPerPage: 10,
        },
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getFormations();

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/formations', { params: undefined });
    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch formations with filters', async () => {
    const mockResponse = {
      data: {
        data: [{ id: '1', title: 'Formation 1' }],
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          itemsPerPage: 10,
        },
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const params = {
      category: 'programming',
      level: 'beginner',
      page: 1,
      limit: 10,
      sortBy: 'title',
      sortOrder: 'asc' as const,
    };

    const result = await service.getFormations(params);

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/formations', { params });
    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch formation by id', async () => {
    const mockResponse = {
      data: { id: '1', title: 'Formation 1' },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getFormationById('1');

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/formations/1');
    expect(result).toEqual(mockResponse.data);
  });

  it('should create formation', async () => {
    const mockFormation = { title: 'New Formation' };
    const mockResponse = {
      data: { id: '1', ...mockFormation },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await service.createFormation(mockFormation);

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/formations', mockFormation);
    expect(result).toEqual(mockResponse.data);
  });

  it('should update formation', async () => {
    const mockFormation = { title: 'Updated Formation' };
    const mockResponse = {
      data: { id: '1', ...mockFormation },
    };

    mockedAxios.put.mockResolvedValue(mockResponse);

    const result = await service.updateFormation('1', mockFormation);

    expect(mockedAxios.put).toHaveBeenCalledWith('/api/formations/1', mockFormation);
    expect(result).toEqual(mockResponse.data);
  });

  it('should delete formation', async () => {
    mockedAxios.delete.mockResolvedValue({ data: undefined });

    await service.deleteFormation('1');

    expect(mockedAxios.delete).toHaveBeenCalledWith('/api/formations/1');
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    mockedAxios.get.mockRejectedValue(error);

    await expect(service.getFormations()).rejects.toThrow('Network error');
  });
}); 