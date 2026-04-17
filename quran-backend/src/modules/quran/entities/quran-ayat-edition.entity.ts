import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quran_ayat_edition')
export class QuranAyatEdition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'surah_id' })
  surahId: number;

  @Column({ name: 'ayah_id' })
  ayahId: number;

  @Column()
  text: string;
}
