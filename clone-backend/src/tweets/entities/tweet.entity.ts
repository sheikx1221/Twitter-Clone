import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('tweets')
export class Tweet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ default: 0 })
    likes: number;

    @ManyToOne(() => User, (user) => user.tweets)
    user: User;
}
