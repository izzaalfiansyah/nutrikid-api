import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Measurement } from "./measurement.entity";
import { User } from "./user.entity";

@Entity("measurement_suggesions")
export class MeasurementSuggestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Measurement, (measurement) => measurement.id, {
    onDelete: "CASCADE",
  })
  measurement: Measurement;

  @Column()
  advice: string;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: "NO ACTION",
  })
  creator?: User;

  @Column("timestamp", {
    default: () => "current_timestamp",
  })
  created_at: Date;
}
