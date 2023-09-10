import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ select: false })
    password: string;

    @Column({ default: null, nullable: true })
    fullName: string;

    @Column({ default: null, nullable: true })
    bio: string;

    @OneToMany(() => Tweet, (tweet) => tweet.user)
    tweets: Tweet[];

    @ManyToMany(() => User, (user) => user.following)
    @JoinTable()
    followers: User[];

    @ManyToMany(() => User, (user) => user.followers)
    following: User[];
}