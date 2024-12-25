export class CreateUserDto {
    readonly name?: string;
    readonly level?: string;
    readonly email: string;
    readonly phoneNumber?: string;
    readonly kakaoId?: number;
    readonly provider?: string;
    readonly password?: string;
}
