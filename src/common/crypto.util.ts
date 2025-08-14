import { scryptSync } from 'crypto';

export function encryptPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString('hex');
}
