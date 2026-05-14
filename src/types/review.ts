import { ApiResponse } from "./common";

export interface AuthorDetails {
	name: string;
	username: string;
	avatar_path: string | null;
	rating: number | null;
}

export interface Review {
	id: string;
	author: string;
	author_details: AuthorDetails;
	content: string;
	created_at: string;
	updated_at: string;
	url: string;
}

export interface ReviewResponse extends ApiResponse<Review[]> {
	id: number;
}
