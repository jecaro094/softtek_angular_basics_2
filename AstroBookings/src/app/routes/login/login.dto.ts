/**
 * Login DTO interface
 */
export interface LoginDto {
  username: string;
  password: string;
}

/**
 * User token interface returned by the login API
 */
export interface UserToken {
  userId: string;
  token: string;
}
