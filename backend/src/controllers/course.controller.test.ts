import { getCourses } from './course.controller';

describe('course.controller', () => {
  it('should respond with empty array', () => {
    const req = {} as any;
    const res = { json: jest.fn() } as any;
    getCourses(req, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });
}); 