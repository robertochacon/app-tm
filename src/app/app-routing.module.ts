import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'books', component: BooksComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'users', component: UsersComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
