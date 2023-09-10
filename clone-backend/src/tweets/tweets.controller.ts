import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller("api")
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post("me/tweets")
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }

  @Get("tweets")
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get('tweets/:id')
  findOne(@Param('id') id: string) {
    return this.tweetsService.findOne(+id);
  }

  @Patch('tweets/:id')
  update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetsService.update(+id, updateTweetDto);
  }

  @Delete('tweets/:id')
  remove(@Param('id') id: string) {
    return this.tweetsService.remove(+id);
  }
}
