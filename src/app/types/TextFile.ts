export interface TextFile {
  id: number;
  filename: string;
  file_data: { type: string; data: number[] };
}
