export type NoteSortBy = "id" | "created_at" | "updated_at" | "title";
export type NoteOrder = "asc" | "desc";

export interface CreateNoteBody {
  title: string;
  content: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  userId: number;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface UpdateNoteBody {
  title?: string;
  content?: string;
}

export interface GetNotesQuery {
  page: number;
  limit: number;
  sortBy: NoteSortBy;
  order: NoteOrder;
  search?: string;
}

export interface PaginatedNotesResult {
  items: Note[];
  totalItems: number;
}

export interface CountResult {
  count: string;
}
