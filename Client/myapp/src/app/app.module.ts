import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageDefault }    from './app.pagedefault';
import { PageAComponent } from './app.page-a';
import { PageBComponent } from './app.page-b';
import { PageCComponent } from './app.page-c';
import { PageDComponent } from './app.page-d';
import { PageEComponent } from './app.page-e';
import { routing }        from './app.routing';

@NgModule({
  declarations: [
    AppComponent, PageDefault, PageAComponent, PageBComponent, PageCComponent, PageDComponent, PageEComponent],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
