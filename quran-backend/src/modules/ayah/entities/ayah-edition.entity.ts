import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ayah_edition')
export class AyahEdition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ayah_id' })
  ayahId: number;

  @Column({ name: 'edition_id' })
  editionId: number;

  @Column({ type: 'text' })
  data: string;

  @Column({ name: 'is_audio' })
  isAudio: boolean;
}
