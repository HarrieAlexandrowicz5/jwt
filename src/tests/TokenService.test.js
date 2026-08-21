const TokenService = require('../services/auth/TokenService');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

describe('TokenService', () => {
  describe('validateToken', () => {
    it('should reject expired token', () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjJ9';
      jwt.verify.mockImplementation(() => ({ exp: Date.now() / 1000 - 1 }));
      expect(() => TokenService.validateToken(expiredToken)).toThrow('Token has expired');
    });

    it('should reject invalid token', () => {
      const invalidToken = 'invalid_token';
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });
      expect(() => TokenService.validateToken(invalidToken)).toThrow('Invalid token');
    });

    it('should validate valid token', () => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjJ9';
      jwt.verify.mockImplementation(() => ({ exp: Date.now() / 1000 + 1 }));
      expect(TokenService.validateToken(validToken)).toEqual({ exp: Date.now() / 1000 + 1 });
    });
  });
});