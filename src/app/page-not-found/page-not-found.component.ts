import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
interface Drop {
  left: number;
  bottom: number;
  animationDelay: string;
  animationDuration: string;
}

interface BackDrop {
  right: number;
  bottom: number;
  animationDelay: string;
  animationDuration: string;
}
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  drops: Drop[] = [];
  backDrops: BackDrop[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.makeItRain();
  }
  makeItRain(): void {
    let increment = 0;
    while (increment < 100) {
      const drop = {
        left: increment,
        bottom: Math.floor(Math.random() * 100 + 100),
        animationDelay: `0.${Math.floor(Math.random() * 98 + 1)}s`,
        animationDuration: `0.5${Math.floor(Math.random() * 98 + 1)}s`,
      };
      const backDrop = {
        right: increment,
        bottom: Math.floor(Math.random() * 100 + 100),
        animationDelay: `0.${Math.floor(Math.random() * 98 + 1)}s`,
        animationDuration: `0.5${Math.floor(Math.random() * 98 + 1)}s`,
      };

      this.drops.push(drop);
      this.backDrops.push(backDrop);

      increment += Math.floor(Math.random() * 4 + 2);
    }
  }
  onNavigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
