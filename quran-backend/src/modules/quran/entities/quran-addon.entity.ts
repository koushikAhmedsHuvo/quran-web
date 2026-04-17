import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quran_addons')
export class QuranAddon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;
}
