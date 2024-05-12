import { SnackbarService } from '../../../../core/services/snackbar.service';
import { Component, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "../../../base-component";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent extends BaseComponent {
  private _showModel: boolean;
  get showModel(): boolean {
    return this._showModel;
  }

  search = { query: "", venues: false };
  constructor(private _router: Router, private _snackbarService: SnackbarService) {
    super();
    this._showModel = false;
  }

  goToResults(searchText: string) {
    if (searchText.trim() != "") {
      this._showModel = false;

      let searchType = "searchText";
      if (this.search.venues) {
        searchType = "property";
      }
      this._snackbarService.error('Feature not implemented yet!');
      //this._router.navigateByUrl(`search/results/${searchType}/${encodeURIComponent(searchText)}`);
    }
  }

  showSearch() {
    this._showModel = true;
  }

  hideSearch() {
    this._showModel = false;
  }

  searchByEnterKey(event, searchText: string) {
    if (event.keyCode === 13) {
      this.goToResults(searchText);
    }
  }
}
