import { TagInterface } from './tag.model';

export interface SkillInterface {
  id?: string;
  created_at?: Date;
  description?: string;
  name: string;
  slug?: string;
  tags?: Array<TagInterface>;
  url?: string;
}
