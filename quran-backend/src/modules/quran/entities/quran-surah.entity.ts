import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { QuranAyah } from './quran-ayah.entity';

@Entity('quran_surahs')
export class QuranSurah {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name_ar' })
  nameAr: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'name_en_translation' })
  nameEnTranslation: string;

  @Column()
  type: string;

  // @OneToMany(() => QuranAyah, ayah => ayah.surah)
  // ayahs: QuranAyah[];
}
