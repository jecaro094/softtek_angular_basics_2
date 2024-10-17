export type LaunchStatus = 'Scheduled' | 'Confirmed' | 'Launched' | 'Delayed' | 'Aborted';
export interface launchDto {
    id: string;
    agencyId: string;
    rocketId: string;
    date: Date;
    mission: string;
    destination: string;
    pricePerSeat: number;
    status: LaunchStatus;
}
