import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import { buildSchema } from 'type-graphql';
import { __prod__ } from './constants';
import mikroConfig from './mikro-orm.config';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';

// import { Post } from './entities/Post';

const main = async () => {
  // Calles the Database through mikro-orm with the variables set in the config
  const orm = await MikroORM.init(mikroConfig);
  // ?????
  await orm.getMigrator().up();
  // Creates the first Entry in the table

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: 'sid',
      store: new RedisStore({
        client: redisClient,
        // disables TimeToLast so the session stays alive forever !!!Change Later!!!
        // disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 Years,
        httpOnly: true,
        sameSite: 'strict', // protection against Cross Site Scripting
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app });

  // const post = orm.em.create(Post, { title: 'my first Post' });
  // await orm.em.persistAndFlush(post);

  app.listen(4000, () => {
    console.log('Server started on Localhost:4000');
  });
};

main();
