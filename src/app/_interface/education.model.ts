export interface EducationInterface {
  id?: string;
  degree: string;
  degree_type: string;
  started_at: Date;
  ended_at: Date;
  institution: string;
  slug?: string;
  current: boolean;
}
