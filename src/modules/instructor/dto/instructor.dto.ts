export class CreateInstructorDto {
    contact: string;
    notificationSettings?: Record<string, any>;
    introduction?: string;
    career?: string;
    workingHours?: Record<string, any>;
    workingDays?: string[];
}

export class UpdateInstructorDto {
contact?: string;
notificationSettings?: Record<string, any>;
introduction?: string;
career?: string;
workingHours?: Record<string, any>;
workingDays?: string[];
}