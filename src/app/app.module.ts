import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarintoComponent } from './components/navbarinto/navbarinto.component';
import { LoginComponent } from './components/login/login.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';
import { ModalPasswordComponent } from './components/modal-password/modal-password.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { ModalBooksComponent } from './components/modal-books/modal-books.component';
import { ModalAuthorComponent } from './components/modal-author/modal-author.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    NavbarComponent,
    DashboardComponent,
    NavbarintoComponent,
    LoginComponent,
    SubmenuComponent,
    UsersComponent,
    ModalPasswordComponent,
    AuthorsComponent,
    BooksComponent,
    ModalBooksComponent,
    ModalAuthorComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
