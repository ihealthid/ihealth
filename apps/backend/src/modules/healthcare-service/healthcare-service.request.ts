import { IsNumber, IsString } from 'class-validator';

/**
 * The ClinicServiceInputRequest class represents a request to perform an operation
 * on a clinic. It contains properties for the name of the clinic.
 */
export class HealthcareServiceInputRequest {
  /**
   * The name of the clinic.
   */
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
