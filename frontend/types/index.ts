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
