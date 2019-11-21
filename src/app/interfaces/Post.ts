import {Like} from "./Like";

export class Post {
    id: number;
    title: String;
    description: String;
    image: string;
    likes: Like[];
}
