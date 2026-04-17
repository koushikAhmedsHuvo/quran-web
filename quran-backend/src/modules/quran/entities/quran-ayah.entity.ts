import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { QuranSurah } from "./quran-surah.entity";

@Entity("quran_ayahs")
export class QuranAyah {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "surah_id" })
  surahId: number;

  @Column({ name: "ayah_id" })
  ayahId: number;

  @Column()
  text: string;

  // @ManyToOne(() => QuranSurah, surah => surah.ayahs)
  // @JoinColumn({ name: 'surah_id' })
  // surah: QuranSurah;
}
