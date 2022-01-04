import { IsDateString, IsDefined, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export interface LogAnswer {
  user_id: string;
  log_date: Date;
  created_date?: Date;
  answers: { [key: string]: AnswerData };
  when: Date;
  domain: string;
}

export type AnswerData = string | number | boolean | null;

export class AnswerSaveRequest {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  domain: string;
  @IsString()
  @IsDateString()
  date: string;
  answers: QuestionAnswer[];
}

export interface AnswerResponse {
  log_date: Date;
  user_id: string;
  answers: { [key: string]: AnswerData };
}

export interface QuestionAnswer {
  question: string;
  answer: AnswerData;
}
