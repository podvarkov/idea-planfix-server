import { format } from 'util';

import config from '../config';
import { IdeaTask, PlanfixTask, PlanfixTasksResponce } from '../types';

export const combineRequestParams = (): { [key: string]: any } => {
  const allStatuses: number[] = config.get('planfix.allStatuses');
  const showStatuses: number[] = config.get('planfix.showStatuses');
  const filter = allStatuses
    .filter((status) => !showStatuses.includes(status))
    .map((status) => ({ type: 10, operator: 'notequal', value: status }));

  return {
    pageSize: 100,
    filter: 'MY',
    filters: { filter: [...filter, { type: 51, operator: 'equal', value: config.get('planfix.template') }] },
  };
};

const composeUrl = (general: string): string => format('https://%s.planfix.ru/task/%s', config.get('planfix.account'), general);

export const mapTaskResponce = (responce: PlanfixTasksResponce): IdeaTask[] => {
  const tasks = ([] as PlanfixTask[]).concat(responce.tasks.task);
  return tasks.map((task) => ({
    id: task.id,
    general: task.general,
    description: task.description,
    summary: task.title,
    issueUrl: composeUrl(task.general),
  }));
};
