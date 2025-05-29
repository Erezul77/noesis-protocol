export type Response = {
  userId: string;
  text: string;
  deltaP: number;
  timestamp: number;
};

export type Reflection = {
  id: string;
  content: string;
  psi: number;
  joyDelta: number;
  deltaP: number;
  Aa: number;
  responses: Response[];
};