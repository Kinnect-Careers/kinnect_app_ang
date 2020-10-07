// TODO: Add partner interface
import { Tag } from './tag.model';

export interface Job {
  title: string;
  text: string;
  pub_date: Date;
  partner: string;
  time_ago: string;
  partner_name: string;
  tags?: Tag[];
}
