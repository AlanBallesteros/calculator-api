import { Record } from 'src/records/entities/record.entity';
import type { Pagination } from 'src/types/pagination';

export interface ResponseRecords {
  records: Record[];
  pagination: Pagination;
}
