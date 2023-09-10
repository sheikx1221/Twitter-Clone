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
  async create(createTweetDto: CreateTweetDto) {
    const response = await this.tweetsModal.save(createTweetDto);
    return this.tweetsModal.findOne({ where: { id: response.id }, relations: ['user']});
  }

  findAll() {
    return this.tweetsModal.find({
      relations: ['user'],
      order: { createdAt: "DESC" }
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
