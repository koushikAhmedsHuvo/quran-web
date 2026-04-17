import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('editions')
export class Edition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @Column()
  language: string;

  @Column()
  name: string;

  @Column()
  englishName: string;

  @Column()
  format: string;

  @Column()
  type: string;
}
