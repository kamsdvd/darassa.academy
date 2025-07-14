import axios from 'axios';
import { CourseService } from '../courseService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CourseService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all courses without params', async () => {
    const mockCourses = [{ id: '1', title: 'Course 1' }];
    mockedAxios.get.mockResolvedValue({ data: mockCourses });

    const courses = await CourseService.getAll();
    expect(courses).toEqual(mockCourses);
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/courses', { params: undefined });
  });

  it('should fetch all courses with params', async () => {
    const mockCourses = [{ id: '1', title: 'Course 1' }];
    const params = { category: 'dev' };
    mockedAxios.get.mockResolvedValue({ data: mockCourses });

    const courses = await CourseService.getAll(params);
    expect(courses).toEqual(mockCourses);
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/courses', { params });
  });

  it('should fetch a course by id', async () => {
    const mockCourse = { id: '1', title: 'Course 1' };
    mockedAxios.get.mockResolvedValue({ data: mockCourse });

    const course = await CourseService.getById('1');
    expect(course).toEqual(mockCourse);
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/courses/1');
  });

  it('should create a course', async () => {
    const mockCourse = { title: 'New Course' };
    mockedAxios.post.mockResolvedValue({ data: { id: '1', ...mockCourse } });

    const newCourse = await CourseService.create(mockCourse);
    expect(newCourse).toEqual({ id: '1', ...mockCourse });
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/courses', mockCourse);
  });

  it('should update a course', async () => {
    const mockCourse = { title: 'Updated Course' };
    mockedAxios.put.mockResolvedValue({ data: { id: '1', ...mockCourse } });

    const updatedCourse = await CourseService.update('1', mockCourse);
    expect(updatedCourse).toEqual({ id: '1', ...mockCourse });
    expect(mockedAxios.put).toHaveBeenCalledWith('/api/courses/1', mockCourse);
  });

  it('should delete a course', async () => {
    mockedAxios.delete.mockResolvedValue({});

    await CourseService.delete('1');
    expect(mockedAxios.delete).toHaveBeenCalledWith('/api/courses/1');
  });
});
