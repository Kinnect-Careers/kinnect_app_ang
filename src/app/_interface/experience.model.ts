export interface ExperienceInterface {
  id?: string;
  job_title: string;
  location: string;
  started_at: Date;
  ended_at?: Date;
  company: string;
  slug?: string;
  current: boolean;
  tasks: string;
  created_at?: Date;
}
