import { Component, OnInit } from '@angular/core';
import { BlogService, IBlogs, IBlogsResponse } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public blogus: Array<IBlogsResponse> = []; 

  constructor(private blogUser: BlogService) { }

  ngOnInit(): void {
    this.getUserBlogs();
  }
 
  getUserBlogs(): void{
      this.blogUser.getAll().subscribe(data => {
      console.log(data);
      this.blogus = data;
    })
  }

}
