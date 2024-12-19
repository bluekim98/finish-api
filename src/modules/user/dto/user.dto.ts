export class UserDto {
    readonly id: number;
    readonly name: string;
    readonly level: string;
    readonly email: string;
    readonly device: string;
    readonly provider: string;
    readonly phoneNumber: string;
    readonly registeredAt: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly kakaoId: number;
}
