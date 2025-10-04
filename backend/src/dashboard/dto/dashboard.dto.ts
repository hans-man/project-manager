export class DashboardStatsDto {
  totalUsers: number;
  totalProjects: number;
  totalIssues: number;
  totalTimeLogs: number;

  totalInstanceCodes: number;

  projectsByStatus: { status: string; count: number }[];
  issuesByStatus: { status: string; count: number }[];
  issuesByPriority: { priority: string; count: number }[];
  timeLogsByUser: { userName: string; totalHours: number }[];

}
