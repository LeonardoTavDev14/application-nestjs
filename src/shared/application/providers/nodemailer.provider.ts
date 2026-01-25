export abstract class sendPayload {
  email: string;
  subject: string;
  html: string;
}

export abstract class INodemailerProvider {
  abstract sendingMail(payload: sendPayload): Promise<void>;
}
