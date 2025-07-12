import { login } from './auth.controller';

describe('auth.controller', () => {
  it('should respond with Login message', () => {
    const req = {} as any;
    const res = { json: jest.fn() } as any;
    login(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login' });
  });
}); 