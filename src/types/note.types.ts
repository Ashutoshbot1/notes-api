export interface CreateNoteBody {
  title: string;
  content: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface UpdateNoteBody {
  title?: string;
  content?: string;
}
