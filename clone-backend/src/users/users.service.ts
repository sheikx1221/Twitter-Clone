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
  private seeded = false;

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
    if (this.seeded) return "Already seeded";
    this.log.debug("seed running");
    try {
      const response = await this.userModal.save([
        {
          "username": "john_doe",
          "email": "john.doe@example.com",
          "phone": "1234567890",
          "password": "admin123",
          "fullName": "John Doe",
          "bio": "I love tweeting!",
          "profilePicture": "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/E12KS1G65-W0168RE00G7-133faf432639-512.jpeg"
        },
        {
          "username": "alice_smith",
          "email": "alice.smith@example.com",
          "phone": "1234567891",
          "password": "admin123",
          "fullName": "Alice Smith",
          "bio": "Tech enthusiast and blogger",
          "profilePicture": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
          "username": "jane_doe",
          "email": "jane.doe@example.com",
          "phone": "1234567892",
          "password": "admin123",
          "fullName": "Jane Doe",
          "bio": "Travel addict and food lover",
          "profilePicture": "https://static.wixstatic.com/media/7fa9fc_20b81982b5174c6087d2c12fc071058e~mv2.jpg/v1/fill/w_640,h_428,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/7fa9fc_20b81982b5174c6087d2c12fc071058e~mv2.jpg"
        },
        {
          "username": "bob_johnson",
          "email": "bob.johnson@example.com",
          "phone": "1234567893",
          "password": "admin123",
          "fullName": "Bob Johnson",
          "bio": "Sports enthusiast and fitness guru",
          "profilePicture": "https://cdnblog.picsart.com/2023/03/Bumble-Blog-1-780x520.png"
        },
        {
          "username": "emma_watson",
          "email": "emma.watson@example.com",
          "phone": "1234567894",
          "password": "admin123",
          "fullName": "Emma Watson",
          "bio": "Bookworm and movie buff",
          "profilePicture": "https://nursing.vanderbilt.edu/images/directory/hande_karen-500.jpg"
        },
        {
          "username": "michael_jackson",
          "email": "michael.jackson@example.com",
          "phone": "1234567895",
          "password": "admin123",
          "fullName": "Michael Jackson",
          "bio": "King of Pop",
          "profilePicture": "https://paramotoroutlet.com/jpg/1594668408164.jpg"
        },
        {
          "username": "lisa_simpson",
          "email": "lisa.simpson@example.com",
          "phone": "1234567896",
          "password": "admin123",
          "fullName": "Lisa Simpson",
          "bio": "Student and saxophonist",
          "profilePicture": "https://www.morganstanley.com/content/dam/msdotcom/people/tiles/miriam-faghihi.jpg.img.490.medium.jpg/1595876429967.jpg"
        },
        {
          "username": "peter_parker",
          "email": "peter.parker@example.com",
          "phone": "1234567897",
          "password": "admin123",
          "fullName": "Peter Parker",
          "bio": "Friendly neighborhood Spider-Man",
          "profilePicture": "https://mars.nasa.gov/people/images/profile/2x2/mwsmith-23258-profile-hi_20BFFA1F-F1AD-414F-8550C9E61A6CB3B6.jpg"
        },
        {
          "username": "mary_smith",
          "email": "mary.smith@example.com",
          "phone": "1234567898",
          "password": "admin123",
          "fullName": "Mary Smith",
          "bio": "Art lover and painter",
          "profilePicture": "https://i.dailymail.co.uk/i/pix/2016/05/23/22/348B850600000578-3605456-image-m-32_1464040491071.jpg"
        },
        {
          "username": "david_jones",
          "email": "david.jones@example.com",
          "phone": "1234567899",
          "password": "admin123",
          "fullName": "David Jones",
          "bio": "Nature explorer and photographer",
          "profilePicture": "https://media.istockphoto.com/id/1170953707/photo/smiling-black-man.jpg?s=612x612&w=0&k=20&c=lKqsRoMExYAnVtIw9fadM84rOPBhI_LVLCuRaBvstvo="
        }
      ]);

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
      this.seeded = true;
      return "Seed Completed";
    }
    catch (e) {
      this.seeded = true;
      return e.message || e;
    }

  }
}