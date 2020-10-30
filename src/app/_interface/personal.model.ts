export interface LinkInterface {
  id: string;
  created_at: Date;
  link: string;
  link_type: string;
  slug: string;
  url: string;
}

export interface ContactInterface {
  id: string;
  created_at: Date;
  contact: string;
  contact_type: string;
  slug: string;
  url: string;
}
