import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("surahs")
export class Surah {
  @PrimaryColumn({ name: 'number' })
  number: number;

  @Column({ name: "name_ar" })
  nameAr: string;

  @Column({ name: "name_en" })
  nameEn: string;

  @Column({ name: "name_en_translation" })
  nameEnTranslation: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;
}
