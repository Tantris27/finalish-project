import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { User } from './entities/User';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
export default {
  dbName: 'lireddit',
  user: 'postgres',
  password: 'N1etzschesAffe27',
  debug: !__prod__,
  type: 'postgresql',
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
