export abstract class ICompareProvider {
  abstract compare(password: string, hash: string): Promise<boolean>;
}
