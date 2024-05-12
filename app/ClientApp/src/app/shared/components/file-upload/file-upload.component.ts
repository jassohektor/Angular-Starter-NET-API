import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';
import { controller, apiUrl, storedPaths, rootPath } from '../../../app.constants';

@Component({
      selector: 'app-file-upload',
      templateUrl: './file-upload.component.html',
      styleUrls: ['./file-upload.component.scss'],
      animations: [
            trigger('fadeInOut', [
                  state('in', style({ opacity: 100 })),
                  transition('* => void', [
                        animate(300, style({ opacity: 0 }))
                  ])
            ])
      ]
})
export class MaterialFileUploadComponent implements OnInit {

      /* Server Address */
      @Input() ServerPath: string;
      /* Link text */
      @Input() text = 'Upload';
      /* Name used in form which will be sent in HTTP request. */
      @Input() param = 'file';
      /* Target URL for file uploading. */
      @Input() target = apiUrl + controller.fileupload;
      /* File extension that accepted, same as 'accept' of <input type="file" />. 
          By the default, it's set to 'image/*'. */
      @Input() accept = 'image/*';
      /* Allow you to add handler after its completion. Bubble up response text from remote. */
      @Output() complete = new EventEmitter<string>();

      
      files: Array<FileUploadModel> = [];

      constructor(private _http: HttpClient) { }

      onClick() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.onchange = () => {
                  for (let index = 0; index < fileUpload.files.length; index++) {
                        const file = fileUpload.files[index];
                        this.files.push({ data: file, state: 'in', 
                          inProgress: false, progress: 0, canRetry: false, canCancel: true });
                  }
                  this.uploadFiles();
            };
            fileUpload.click();
      }

      ngOnInit(){
            storedPaths.subscribe((item: rootPath)=>{
                  this.ServerPath = item.serverPath;
            });
      }

      cancelFile(file: FileUploadModel) {
            file.sub.unsubscribe();
            this.removeFileFromArray(file);
      }

      retryFile(file: FileUploadModel) {
            this.uploadFile(file);
            file.canRetry = false;
      }

      private uploadFile(file: FileUploadModel) {
            const fd = new FormData();
            fd.append(this.param, file.data);
            fd.append('path', this.ServerPath);

            const req = new HttpRequest('POST', this.target, fd, {
                  headers: new HttpHeaders()
                  .set('Access-Control-Allow-Origin', '*'),
                  reportProgress: true
            });

            file.inProgress = true;
            file.sub = this._http.request(req).pipe(
                  map(event => {
                        switch (event.type) {
                              case HttpEventType.UploadProgress:
                                    file.progress = Math.round(event.loaded * 100 / event.total);
                                    break;
                              case HttpEventType.Response:
                                    return event;
                        }
                  }),
                  tap(message => { }),
                  last(),
                  catchError((error: HttpErrorResponse) => {
                        file.inProgress = false;
                        file.canRetry = true;
                        return of(`${file.data.name} upload failed.`);
                  })
            ).subscribe(
                  (event: any) => {
                        if (typeof (event) === 'object') {
                              this.removeFileFromArray(file);
                              this.complete.emit(event.body);
                        }
                  }
            );
      }

      private uploadFiles() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.value = '';

            this.files.forEach(file => {
                  this.uploadFile(file);
            });
      }

      private removeFileFromArray(file: FileUploadModel) {
            const index = this.files.indexOf(file);
            if (index > -1) {
                  this.files.splice(index, 1);
            }
      }

}

export class FileUploadModel {
      data: File;
      state: string;
      inProgress: boolean;
      progress: number;
      canRetry: boolean;
      canCancel: boolean;
      sub?: Subscription;
}