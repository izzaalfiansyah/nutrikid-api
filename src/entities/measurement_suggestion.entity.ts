import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Measurement } from "./measurement.entity";
import { User } from "./user.entity";

@Entity("measurement_suggesions")
export class MeasurementSuggestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Measurement, (measurement) => measurement.id)
  measurement: Measurement;

  @Column()
  advice: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  creator: User;

  @Column("timestamp", {
    default: () => "current_timestamp",
  })
  created_at: Date;
}
