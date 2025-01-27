import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://default:YGxbhiDSqCssFxZOPPMbPRMsEfaPREkJ@junction.proxy.rlwy.net:12425',
      },
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string; legacyMode: true }) => {
        try {
          const client = createClient(options);
          await client.connect();
          return client;
        } catch (err) {
          console.log('ATENÇAÕ, ERRO AO ENCONTRAR SERVIDOR REDIS');
        }
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
