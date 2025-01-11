export interface LoginResponse {
  token: string;
  username: string;
}

export interface Question {
  id: number;
  text: string;
  options: { label: string; value: number }[];
}

export interface CalculatorResult {
  id: number;
  result: number;
  created_at: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
  login: (user: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
};
