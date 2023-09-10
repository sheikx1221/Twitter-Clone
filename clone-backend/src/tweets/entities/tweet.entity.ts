import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

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

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date | string;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date | string;

    @DeleteDateColumn({ type: "timestamp with time zone" })
    deletedAt: Date | string;
}
