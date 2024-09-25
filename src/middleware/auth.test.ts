import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './auth'; 
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

jest.mock('jsonwebtoken');
describe('authenticateToken', () => {
  let req: Partial<AuthenticatedRequest>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {}, 
    };
    res = {
      sendStatus: jest.fn(),
    };
    next = jest.fn();
  });

  it('should respond with 401 if no token is provided', () => {
    authenticateToken(req as AuthenticatedRequest, res as Response, next);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should respond with 403 if token is invalid', () => {
    if(req.headers){
      req.headers['authorization'] = 'invalid_token';

      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
        callback(new Error('Token is invalid'), null);
      });

      authenticateToken(req as AuthenticatedRequest, res as Response, next);
      expect(res.sendStatus).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    }
  });

  it('should call next if token is valid', () => {
    if(req.headers){
      const mockUser = { id: '1', name: 'Test User' };
      req.headers['authorization'] = 'valid_token';

      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
        callback(null, mockUser); 
      });

      authenticateToken(req as AuthenticatedRequest, res as Response, next);
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    }
  });
});
