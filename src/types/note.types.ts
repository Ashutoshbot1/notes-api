export interface CreateNoteBody {
  title: string;
  content: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateNoteBody {
  title?: string;
  content?: string;
}

export interface GetNotesQuery {
  page: number;
  limit: number;
}
