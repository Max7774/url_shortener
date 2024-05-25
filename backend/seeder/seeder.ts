import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

export const uuidGen = function generateUUID() {
  let d = new Date().getTime(),
    d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
};

async function main() {
  console.log('Start seeding...');
  // await createUser();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
