export abstract class ITemplatesProvider {
  abstract sendWelcome(nameOne: string, nameTwo: string): string;
  abstract sendDeleted(name: string): string;
}
