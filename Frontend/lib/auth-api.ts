import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  dateOfBirth?: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  dateOfBirth?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

// Authentication API functions
export const authApi = {
  // Register a new user
  signup: async (userData: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout user
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Logout from all devices
  logoutAll: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout-all');
    return response.data;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse> => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ accessToken: string; tokenType: string; expiresIn: string }>> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

// User API functions
export const userApi = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: {
    name?: string;
    dateOfBirth?: string;
  }): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  // Get public user profile
  getUserById: async (userId: string): Promise<ApiResponse<{ user: Partial<User> }>> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Deactivate account
  deactivateAccount: async (): Promise<ApiResponse> => {
    const response = await api.delete('/users/account');
    return response.data;
  },

  // Get connected OAuth providers
  getOAuthProviders: async (): Promise<ApiResponse<{ providers: Array<{ provider: string; connectedAt: string }> }>> => {
    const response = await api.get('/users/oauth/providers');
    return response.data;
  },

  // Disconnect OAuth provider
  disconnectOAuth: async (provider: string): Promise<ApiResponse> => {
    const response = await api.delete(`/users/oauth/${provider}`);
    return response.data;
  },
};

// OAuth API functions
export const oauthApi = {
  // Get available OAuth providers
  getProviders: async (): Promise<ApiResponse<{ providers: Array<{ name: string; displayName: string; authUrl: string }> }>> => {
    const response = await api.get('/auth/oauth/providers');
    return response.data;
  },

  // Initiate OAuth login
  initiateOAuth: async (provider: 'google' | 'facebook' | 'github'): Promise<ApiResponse<{ redirectUrl: string }>> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const redirectUrl = `${baseUrl}/auth/oauth/${provider}`;
      
      return {
        success: true,
        message: 'Redirecting to OAuth provider',
        data: { redirectUrl }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to initiate OAuth login'
      };
    }
  },
};

// Generic API error handler
export const handleApiError = (error: any): string => {
  if (error.response?.status === 423) {
    return 'Your account is temporarily locked due to too many failed login attempts. Please try again later or contact support.';
  }
  
  if (error.response?.data?.message) {
    // Handle validation errors with detailed field errors
    if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
      const errorMessages = error.response.data.errors.map((err: any) => {
        return `${err.field}: ${err.message}`;
      });
      return errorMessages.join(', ');
    }
    return error.response.data.message;
  }
  if (error.response?.data?.errors) {
    return error.response.data.errors.map((err: any) => err.message).join(', ');
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Token management utilities
export const tokenUtils = {
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem('accessToken', token);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem('refreshToken', token);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  clearTokens: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },

  // Legacy methods for backward compatibility
  setToken: (token: string): void => {
    localStorage.setItem('accessToken', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  removeToken: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};