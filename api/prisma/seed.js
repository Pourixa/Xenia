const { faker } = require("@faker-js/faker");
const db = require("./db").prisma;

async function seed() {
  console.log("Seed Start!");
  await db.$connect();
  const EventTypes = ["FOLLOW", "POST", "LIKE", "COMMENT"];
  try {
    for (let i = 0; i < 50; i++) {
      const { id, username } = await db.user.create({
        data: {
          username: faker.internet.username() + i,
          avatarUrl: Math.random() > 0.5 ? faker.image.avatar() : null,
          name: faker.internet.displayName(),
          about: Math.random() > 0.5 ? faker.person.bio() : null,
          githubAccountID: i,
        },
      });
      for (let j = 0; j < 10; j++) {
        await db.post.create({
          data: {
            content: faker.lorem.text(),
            authorId: id,
          },
        });
      }

      for (let j = 0; j < 10; j++) {
        await db.notification.create({
          data: {
            eventType: faker.helpers.arrayElement(EventTypes),
            isRead: Math.random() > 0.5 ? true : false,
            receiverId: id,
            data: {
              actionMaker: faker.internet.username(),
              madeOn: username,
            },
          },
        });
      }
    }
  } catch {}

  const users = await db.user.findMany();
  for (const user of users) {
    const numberOfFollows = faker.number.int({ min: 0, max: 10 });
    for (let i = 0; i < numberOfFollows; i++) {
      const target = faker.helpers.arrayElement(users);
      if (target.id === user.id) continue;

      try {
        await db.followship.create({
          data: {
            followerId: user.id,
            followingId: target.id,
          },
        });
      } catch {
        continue;
      }
    }
  }

  const posts = await db.post.findMany();

  for (const post of posts) {
    const numberOfLikes = faker.number.int({ min: 0, max: 20 });

    for (let i = 0; i < numberOfLikes; i++) {
      const user = faker.helpers.arrayElement(users);

      try {
        await db.like.create({
          data: {
            postId: post.id,
            likerId: user.id,
          },
        });
      } catch {
        continue;
      }
    }
  }

  try {
    for (const post of posts) {
      const numberOfComments = faker.number.int({ min: 0, max: 5 });

      for (let i = 0; i < numberOfComments; i++) {
        const user = faker.helpers.arrayElement(users);
        const userComments = faker.number.int({ min: 1, max: 5 });
        for (let j = 0; j < userComments; j++) {
          await db.comment.create({
            data: {
              content: faker.lorem.sentence(),
              commenterId: user.id,
              postId: post.id,
            },
          });
        }
      }
    }
  } catch {}

  await db.$disconnect();
  console.log("seed complete!");
}

seed().then(console.log("seeding..."));
