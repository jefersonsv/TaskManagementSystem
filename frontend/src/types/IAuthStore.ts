interface IAuthStore {
  token: string;
  setToken(token: string): void;
}
