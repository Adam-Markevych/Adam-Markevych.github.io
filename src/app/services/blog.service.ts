import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.BACKEND_URL;
  private api = { blogs: `${this.url}/blogs` }


  constructor(
   private http: HttpClient // для використання http методів
  ) { }


  getAll(): Observable<IBlogsResponse[]> {
    return this.http.get<IBlogsResponse[]>(this.api.blogs);
    //return this.http.get<IBlogsResponse[]>("http://localhost:3000/blogs");
  }
  create(blogs: IBlogsRequest): Observable<IBlogsResponse> {
    return this.http.post<IBlogsResponse>(this.api.blogs,blogs);
  }
  update(blogs: IBlogsRequest, id: number): Observable<IBlogsResponse>{
    return this.http.patch<IBlogsResponse>(`${this.api.blogs}/${id}`,blogs);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.blogs}/${id}`);
  }
}

export interface IBlogs{
  id: number,
  title: string,
  text: string,
  author: string
}

export interface IBlogsRequest{
  title: string;
  text: string;
  author: string;
}

export interface IBlogsResponse{
  id: number;
  title: string;
  text: string;
  author: string;
}