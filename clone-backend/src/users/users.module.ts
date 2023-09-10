import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Tweet } from 'src/tweets/entities/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule]
})
export class UsersModule {}
