import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<DashboardStatsDto>;
}
