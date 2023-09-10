import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private log = new Logger("UserService");
  constructor(
    @InjectRepository(User)
    private readonly userModal: Repository<User>,
    @InjectRepository(Tweet)
    private readonly tweetModal: Repository<Tweet>
  ) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async seed() {
    this.log.debug("seed running");
    try {
      const response = await this.userModal.save([
        {
          "username": "john_doe",
          "email": "john.doe@example.com",
          "phone": "1234567890",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "John Doe",
          "bio": "I love tweeting!"
        },
        {
          "username": "alice_smith",
          "email": "alice.smith@example.com",
          "phone": "1234567891",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Alice Smith",
          "bio": "Tech enthusiast and blogger"
        },
        {
          "username": "jane_doe",
          "email": "jane.doe@example.com",
          "phone": "1234567892",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Jane Doe",
          "bio": "Travel addict and food lover"
        },
        {
          "username": "bob_johnson",
          "email": "bob.johnson@example.com",
          "phone": "1234567893",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Bob Johnson",
          "bio": "Sports enthusiast and fitness guru"
        },
        {
          "username": "emma_watson",
          "email": "emma.watson@example.com",
          "phone": "1234567894",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Emma Watson",
          "bio": "Bookworm and movie buff"
        },
        {
          "username": "michael_jackson",
          "email": "michael.jackson@example.com",
          "phone": "1234567895",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Michael Jackson",
          "bio": "King of Pop"
        },
        {
          "username": "lisa_simpson",
          "email": "lisa.simpson@example.com",
          "phone": "1234567896",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Lisa Simpson",
          "bio": "Student and saxophonist"
        },
        {
          "username": "peter_parker",
          "email": "peter.parker@example.com",
          "phone": "1234567897",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Peter Parker",
          "bio": "Friendly neighborhood Spider-Man"
        },
        {
          "username": "mary_smith",
          "email": "mary.smith@example.com",
          "phone": "1234567898",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "Mary Smith",
          "bio": "Art lover and painter"
        },
        {
          "username": "david_jones",
          "email": "david.jones@example.com",
          "phone": "1234567899",
          "password": "$2a$10$0x5vc1M.gRrxoxwVDa53ReeHmnXzPTQFTO5A3QpQu4crXwv7.Q2va",
          "fullName": "David Jones",
          "bio": "Nature explorer and photographer"
        }
      ]
      );
  
      const ids = response.map(({ id }) => id);
      const randomId = () => ids[Math.floor(Math.random() * ids.length)];
  
      const tweetsResponse = await this.tweetModal.save([
        {
          "content": "Just posted my first tweet!",
          "user": { id: randomId() }
        },
        {
          "content": "Loving the Twitter experience!",
          "user": { id: randomId() }
        },
        {
          "content": "Exploring the world of tweets!",
          "user": { id: randomId() }
        },
        {
          "content": "Tweeting is so much fun!",
          "user": { id: randomId() }
        },
        {
          "content": "Sharing my thoughts with the world!",
          "user": { id: randomId() }
        },
        {
          "content": "Joining Twitterverse!",
          "user": { id: randomId() }
        },
        {
          "content": "Another day, another tweet!",
          "user": { id: randomId() }
        },
        {
          "content": "Excited to tweet!",
          "user": { id: randomId() }
        },
        {
          "content": "Tweeting about my favorite topics!",
          "user": { id: randomId() }
        },
        {
          "content": "Getting the hang of Twitter!",
          "user": { id: randomId() }
        },
        {
          "content": "Tweeting my thoughts!",
          "user": { id: randomId() }
        },
        {
          "content": "Retweeting interesting content!",
          "user": { id: randomId() }
        },
        {
          "content": "Exploring trending hashtags!",
          "user": { id: randomId() }
        },
        {
          "content": "Tweeting from my favorite spot!",
          "user": { id: randomId() }
        },
        {
          "content": "Following interesting people!",
          "user": { id: randomId() }
        },
        {
          "content": "Tweeting about my hobbies!",
          "user": { id: randomId() }
        },
        {
          "content": "Engaging with my followers!",
          "user": { id: randomId() }
        },
        {
          "content": "Retweeting awesome content!",
          "user": { id: randomId() }
        },
        {
          "content": "Tweeting on a rainy day!",
          "user": { id: randomId() }
        },
        {
          "content": "Sharing quotes and inspiration!",
          "user": { id: randomId() }
        }
      ]);

      return "Seed Completed";
    }
    catch(e) {
      return e.message || e;
    }

  }
}