import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';
import { WindowComponent } from './window/window.component';
import { InputComponent } from './input/input.component';
import { Safe } from '../_shared/pipes/safe';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpService } from '../_shared/http.service';
import { clientRoutes } from './client.routes';
import { ClientService } from './client.service';

@NgModule({
    declarations: [
        ClientComponent,
        WindowComponent,
        InputComponent,
        Safe
    ],
    entryComponents: [
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        RouterModule.forChild(clientRoutes),

        BrowserAnimationsModule,
    ],
    providers: [ClientService, HttpService],

})
export class ClientModule { }
