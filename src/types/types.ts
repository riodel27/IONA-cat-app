export interface Cat {
	id: string;
	url: string;
	width: number;
	height: number;
	breeds?: CatBreed[];
}

export interface CatBreed {
	id: string;
	name: string;
	temperament?: string;
	origin?: string;
	description?: string;
}
