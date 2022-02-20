import { Component, OnInit } from '@angular/core';
import { BlogService, IBlogs, IBlogsResponse } from '../services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  public blog: Array<IBlogsResponse> = [];
  public author!: string;
  public text!: string;
  public title!: string;
  public saveIndex!: number;
  public save = false;
  public add = true;
  public disSave = false;
  public disAdd = true;
  public disDelete = false;
  constructor(private blogsService: BlogService) { }
  


  ngOnInit(): void {
    this.getBlogs();
  }
  inp(): void{
    if(this.author !== '' || this.title !== '' || this.text !==''){
      this.disAdd = false;
      this.disSave = false;
    }else{
      this.disAdd = true;
      this.disSave = true;
    }
  }
  reset(): void {
    this.title = '';
    this.text = '';
    this.author = '';
  }
  getBlogs(): void{
      this.blogsService.getAll().subscribe(data => {
      console.log(data);
      this.blog = data;
    })
  }
  btnAdd(): void{
    if(this.author.length != 0  && this.title.length != 0 && this.text.length != 0){
      this.disAdd = false;
      const obj = {
        title: this.title,
        text: this.text,
        author: this.author
      }
      this.blogsService.create(obj).subscribe(data => {
        this.getBlogs();
        this.reset();
        this.disAdd = true;
      })
    }else{
      console.log('btnAdd true');
      this.disAdd = true;
    }
  
  }
  btnEdit(blogs: IBlogs): void{
    this.save = true;
    this.add = false;
    this.disDelete = true;
    this.title = blogs.title;
    this.author = blogs.author;
    this.text = blogs.text;
    this.saveIndex = blogs.id;
  }

  btnDelete(blogs: IBlogs): void{
    const obj = {
      title: this.title,
      text: this.text,
      author: this.author,
    }
    
    this.blogsService.delete(blogs.id).subscribe(data => {
      console.log('fgew', data);
      this.getBlogs();
    })
  }
  btnSave(): void{
    if(this.author.length != 0  && this.title.length != 0 && this.text.length != 0){
      this.disSave = false;
    const objEdit = {
      title: this.title,
      text: this.text,
      author: this.author
    }
    this.blogsService.update(objEdit, this.saveIndex).subscribe(data => {
      console.log('eger',data);
      this.getBlogs();
      this.reset();
      this.add = true;
      this.save = false;
      this.disDelete = false;
    })
  }else{
    this.disSave = true;
  }
  }
}
