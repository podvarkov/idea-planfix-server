import { Request } from 'express';
import { PlanfixClient } from 'planfix-client/src/types/types';

export type AuthorizedRequest = Request & { client?: PlanfixClient };
export type PlanfixTask = {
  id: string,
  title: string,
  description: string,
  general: string
};
export type PlanfixTasksResponce = { tasks: { task: PlanfixTask | PlanfixTask[] }};
export type IdeaTask = {
  id: string,
  summary: string,
  issueUrl: string,
  description: string,
  general: string,
};
