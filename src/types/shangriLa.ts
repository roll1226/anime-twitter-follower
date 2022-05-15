export type Cours = {
  id: number;
  year: number;
  cours: number;
};

export type Anime = {
  id: number;
  title: string;
  title_short1: string;
  title_short2: string;
  title_short3: string;
  title_en: string;
  public_url: string;
  twitter_account: string;
  twitter_hash_tag: string;
  cours_id: number;
  created_at: string;
  updated_at: string;
  sex: number;
  sequel: number;
  city_code: number;
  city_name: string;
  product_companies: string;
  ogp: {
    og_title: string;
    og_type: string;
    og_description: string;
    og_url: string;
    og_image: string;
    og_site_name: string;
  };
};
