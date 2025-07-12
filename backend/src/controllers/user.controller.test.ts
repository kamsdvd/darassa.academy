import { getUser } from './user.controller';

describe('user.controller', () => {
  it('should respond with empty object', () => {
    const req = {} as any;
    const res = { json: jest.fn() } as any;
    getUser(req, res);
    expect(res.json).toHaveBeenCalledWith({});
  });
}); 