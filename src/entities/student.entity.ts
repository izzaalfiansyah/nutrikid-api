import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { School } from "./school.entity";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nisn: string;

  @Column()
  name: string;

  @Column("date")
  birth_date: string;

  @Column("enum", {
    enum: ["l", "p"],
  })
  gender: "l" | "p";

  @ManyToOne(() => School, (school) => school.id, {
    onDelete: "CASCADE",
  })
  school: School;

  @Column("timestamp", {
    nullable: true,
  })
  deleted_at?: Date;
}
