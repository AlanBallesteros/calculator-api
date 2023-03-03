import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}
