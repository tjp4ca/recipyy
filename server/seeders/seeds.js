const userSeeds = require('./userSeed.json');
const recipeSeeds = require('./recipeSeed.json');
const db = require('../config/connection');
const { Recipe, User} = require('../models');

// const randomArrayIndex = (arrLen) => Math.floor(Math.random() * arrLen);

db.once('open', async () => {
  try {
    await Recipe.deleteMany({});
    await User.deleteMany({});

    const users = await User.create(userSeeds);

    for (const recipe of recipeSeeds) {
      recipe.user = users[randomArrayIndex(users.length)]._id;
    }

    for (let i = 0; i < recipeSeeds.length; i++) {
      const { _id, username } = await Recipe.create(recipeSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            recipes: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});