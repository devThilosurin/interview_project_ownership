export interface Ownership {
  hn: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface OwnershipResponse {
  items: Ownership[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface OwnershipForm {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}
