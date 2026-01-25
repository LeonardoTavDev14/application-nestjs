export abstract class IJwtProvider {
  abstract generateToken(payload: object): Promise<string>;
  abstract verifyToken(token: string): Promise<any>;
}
