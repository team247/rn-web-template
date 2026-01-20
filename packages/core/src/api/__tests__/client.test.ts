import axios from 'axios';
import { apiClient, api, setAccessToken, setRefreshTokenHandler } from '../client';

// Mock axios
jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  };

  return {
    create: jest.fn(() => mockAxiosInstance),
    default: {
      create: jest.fn(() => mockAxiosInstance),
    },
  };
});

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setAccessToken(null);
  });

  describe('setAccessToken', () => {
    it('should set and clear access token', () => {
      // This is mostly testing the function exists and can be called
      expect(() => setAccessToken('test-token')).not.toThrow();
      expect(() => setAccessToken(null)).not.toThrow();
    });
  });

  describe('setRefreshTokenHandler', () => {
    it('should accept a refresh token handler', () => {
      const mockHandler = jest.fn().mockResolvedValue('new-token');
      expect(() => setRefreshTokenHandler(mockHandler)).not.toThrow();
    });
  });

  describe('axios instance creation', () => {
    it('should create axios instance with correct config', () => {
      expect(axios.create).toHaveBeenCalled();
    });
  });

  describe('api helpers', () => {
    const mockAxiosInstance = (axios.create as jest.Mock)();

    beforeEach(() => {
      mockAxiosInstance.get.mockResolvedValue({ data: { result: 'get' } });
      mockAxiosInstance.post.mockResolvedValue({ data: { result: 'post' } });
      mockAxiosInstance.put.mockResolvedValue({ data: { result: 'put' } });
      mockAxiosInstance.patch.mockResolvedValue({ data: { result: 'patch' } });
      mockAxiosInstance.delete.mockResolvedValue({ data: { result: 'delete' } });
    });

    it('should make GET requests', async () => {
      const result = await api.get('/test');
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', { params: undefined });
      expect(result).toEqual({ result: 'get' });
    });

    it('should make GET requests with params', async () => {
      const params = { foo: 'bar' };
      await api.get('/test', params);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', { params });
    });

    it('should make POST requests', async () => {
      const data = { foo: 'bar' };
      const result = await api.post('/test', data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', data);
      expect(result).toEqual({ result: 'post' });
    });

    it('should make PUT requests', async () => {
      const data = { foo: 'bar' };
      const result = await api.put('/test', data);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test', data);
      expect(result).toEqual({ result: 'put' });
    });

    it('should make PATCH requests', async () => {
      const data = { foo: 'bar' };
      const result = await api.patch('/test', data);
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test', data);
      expect(result).toEqual({ result: 'patch' });
    });

    it('should make DELETE requests', async () => {
      const result = await api.delete('/test');
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test');
      expect(result).toEqual({ result: 'delete' });
    });
  });
});
