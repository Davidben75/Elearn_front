export interface UserList {
    id: number;
    name: string;
    lastName: string;
    status: string;
    email: string;
    role?: string;
}

export interface PasswordsInputs {
    oldPassword?: string;
    newPassword: string;
    confirmPassword?: string;
}
