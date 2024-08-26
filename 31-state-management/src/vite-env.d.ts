/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SIGNUP_PASSWORD: string;
	// Add more custom environment variables here
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
