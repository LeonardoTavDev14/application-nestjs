export abstract class IHashProvider {
  abstract hash(password: string): Promise<string>;
}
