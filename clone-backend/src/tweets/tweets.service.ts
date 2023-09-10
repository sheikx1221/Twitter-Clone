import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetsModal: Repository<Tweet>
  ) {}
  create(createTweetDto: CreateTweetDto) {
    return 'This action adds a new tweet';
  }

  findAll() {
    return this.tweetsModal.find({
      relations: ['user']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
