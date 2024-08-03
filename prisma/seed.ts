import { PrismaClient } from "@prisma/client";
import { user } from "./seeding/user";
import { character } from "./seeding/character";
import { item } from "./seeding/item";
import { achievement } from "./seeding/achievement";
import { characterLocker } from "./seeding/chrarcterLocker";
import { present } from "./seeding/present";
import { inventory } from "./seeding/inventory";
import { userAchievement } from "./seeding/userAchievement";
import { post } from "./seeding/post";
import { neighbor } from "./seeding/neighbor";
import { comment } from "./seeding/comment";
import { reply } from "./seeding/reply";
import { like } from "./seeding/like";
import { legend } from "./seeding/legend";

const prisma = new PrismaClient();

async function main() {
  // await user(prisma);
  await character(prisma);
  await item(prisma);
  await achievement(prisma);
  // await characterLocker(prisma);
  // await present(prisma);
  // await inventory(prisma);
  // await userAchievement(prisma);
  // await post(prisma);
  // await neighbor(prisma);
  // await comment(prisma);
  // await reply(prisma);
  // await like(prisma);
  // await legend(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
