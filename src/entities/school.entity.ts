import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schools")
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
