import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 8, nullable: false, unique: true })
  ic: string;

  @Column({ type: "varchar", length: 100, name: "user_name", nullable: false })
  userName: string;

  @Column({ type: "varchar", length: 100, name: "first_name", nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 100, name: "last_name", nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 10, name: "phone_number", nullable: false })
  phoneNumber: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  role: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
