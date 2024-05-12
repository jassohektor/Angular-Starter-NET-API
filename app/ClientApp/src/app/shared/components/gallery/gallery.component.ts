import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit } from "@angular/core";
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation, NgxGalleryComponent } from "@kolkov/ngx-gallery";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { app, getSetting, storedPaths, setNewValue, rootPath } from '../../../app.constants';
import { SnackbarService } from "../../../core/services/snackbar.service";
import { BaseComponent } from "../../../shared/base-component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-gallery",
    templateUrl: "./gallery.component.html",
    styleUrls: ["./gallery.component.scss"],
    encapsulation: ViewEncapsulation.None
  })
  export class GalleryComponent extends BaseComponent implements OnInit {
    constructor(private _fb: FormBuilder, private _snackbarService: SnackbarService) {
        super();
        this.galleryImages = [];
    }
    
    @ViewChild('ngxGallery') ngxGallery: NgxGalleryComponent;
    spath = new FormControl('', [Validators.required, Validators.nullValidator]);
    vpath = new FormControl('', [Validators.required, Validators.nullValidator]);
    attachments: any[] = [];
    galleryOptions: NgxGalleryOptions[] = [
        {
            width: '100%',
            height: '100%',
            previewCloseOnEsc: true,
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
        },
        { image: false, height: "100%" },
        { breakpoint: 500, width: "100%" }
    ];
    galleryImages: NgxGalleryImage[];
    inputForm: FormGroup = this._fb.group({
        ServerPath: this.spath,
        LocalPath: this.vpath
    });
    showGallery: boolean = false;

    @ViewChild('inputServerPath') inputServerPath: ElementRef;
    @ViewChild('inputLocalPath') inputLocalPath: ElementRef;

    ngOnInit() {
        let tmpItems: any[] = JSON.parse(localStorage.getItem('attachments'));
        this.attachments = (tmpItems && tmpItems.length > 0) ? tmpItems : [];
        this.loadItems(this.attachments);
        storedPaths.subscribe((item: rootPath)=>{
            this.inputForm.get('ServerPath').setValue(item.serverPath);
            this.inputForm.get('LocalPath').setValue(item.localPath);
        });
        //this.ngxGallery.onPreviewClose();
    }

    onFileComplete(data: any) {
        this.attachments.push({ fileIdentifier: this.inputLocalPath.nativeElement.value + data.Identifier });
        localStorage.setItem('attachments', JSON.stringify(this.attachments));
        this.loadItems(this.attachments);
    }

    loadItems(items: any[]) {
        this.galleryImages = [];
        for(let attachment of items){
            this.galleryImages.push({
                small: attachment.fileIdentifier,
                big: attachment.fileIdentifier,
                medium: attachment.fileIdentifier
            });
        }
        //this.galleryImages = this.galleryImages.filter(e => e.big.toString().length > 0);
        this.showGallery =  this.galleryImages && this.galleryImages.length > 0;
    }

    deleteItems() {
        localStorage.removeItem('attachments');
        this.loadItems([]);
    }

    onPathChange() {
        let paths:rootPath = new rootPath();
        paths.serverPath = this.inputServerPath.nativeElement.value;
        paths.localPath = this.inputLocalPath.nativeElement.value;
        
        setNewValue(`${app}.paths`, paths);
        this.inputForm.markAsPristine();
    }
  }