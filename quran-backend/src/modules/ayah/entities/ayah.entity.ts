import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ayahs')
export class Ayah {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ name: 'number_in_surah' })
  numberInSurah: number;

  @Column()
  page: number;

  @Column({ name: 'surah_id' })
  surahId: number;

  @Column({ name: 'hizb_id' })
  hizbId: number;

  @Column({ name: 'juz_id' })
  juzId: number;

  @Column()
  sajda: boolean;
}
