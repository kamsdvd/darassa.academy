import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFormations } from '../useFormations';
import { FormationService } from '../../services/formationService';

// Mock du service
jest.mock('../../services/formationService');

describe('useFormations', () => {
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

  it('should fetch formations with default params', async () => {
    const mockFormations = {
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
    };

    (FormationService.getInstance().getFormations as jest.Mock).mockResolvedValue(mockFormations);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useFormations(), { wrapper });

    await act(async () => {
      await result.current.getFormations();
    });

    expect(result.current.getFormations().data).toEqual(mockFormations);
  });

  it('should fetch formations with filters', async () => {
    const mockFormations = {
      data: [{ id: '1', title: 'Formation 1' }],
      meta: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 10,
      },
    };

    (FormationService.getInstance().getFormations as jest.Mock).mockResolvedValue(mockFormations);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useFormations(), { wrapper });

    await act(async () => {
      await result.current.getFormations({
        category: 'programming',
        level: 'beginner',
        page: 1,
        limit: 10,
        sortBy: 'title',
        sortOrder: 'asc',
      });
    });

    expect(FormationService.getInstance().getFormations).toHaveBeenCalledWith({
      category: 'programming',
      level: 'beginner',
      page: 1,
      limit: 10,
      sortBy: 'title',
      sortOrder: 'asc',
    });
  });

  it('should handle formation creation', async () => {
    const mockFormation = { id: '1', title: 'New Formation' };
    (FormationService.getInstance().createFormation as jest.Mock).mockResolvedValue(mockFormation);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useFormations(), { wrapper });

    await act(async () => {
      await result.current.createFormation().mutateAsync(mockFormation);
    });

    expect(FormationService.getInstance().createFormation).toHaveBeenCalledWith(mockFormation);
  });

  it('should handle formation update', async () => {
    const mockFormation = { id: '1', title: 'Updated Formation' };
    (FormationService.getInstance().updateFormation as jest.Mock).mockResolvedValue(mockFormation);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useFormations(), { wrapper });

    await act(async () => {
      await result.current.updateFormation().mutateAsync({
        id: '1',
        data: mockFormation,
      });
    });

    expect(FormationService.getInstance().updateFormation).toHaveBeenCalledWith('1', mockFormation);
  });

  it('should handle formation deletion', async () => {
    (FormationService.getInstance().deleteFormation as jest.Mock).mockResolvedValue(undefined);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useFormations(), { wrapper });

    await act(async () => {
      await result.current.deleteFormation().mutateAsync('1');
    });

    expect(FormationService.getInstance().deleteFormation).toHaveBeenCalledWith('1');
  });
}); 