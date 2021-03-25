import { Component, OnInit, Inject } from "@angular/core";
import install from "@layer0/prefetch/window/install";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  isBrowser: boolean;
  title = "layer0-spartacus";

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.isBrowser) {
        install({ includeCacheMisses: true });
      }
    });
  }
}
