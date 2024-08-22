export type ForgotPasswordCredentials = {
	email: string;
}

export type LoginCredentials = {
	email: string;
	password: string;
}

export type SignupCredentials = {
	email: string;
	password: string;
	confirmPassword: string;
}

export type UpdateProfileFormData = {
	name: string
	photoFiles: FileList
	email: string
	password: string
	confirmPassword: string
}
