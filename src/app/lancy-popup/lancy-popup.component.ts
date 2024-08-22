import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'lancy-popup',
  standalone: true,
  imports: [],
  templateUrl: './lancy-popup.component.html',
  styleUrl: './lancy-popup.component.scss'
})
export class LancyPopupComponent
{
  @Input() title : string = '';
  @HostBinding() isVisible : boolean = false;

  firstShow : boolean = false;

  show()
  {
    this.isVisible = true;
    this.firstShow = true;
  }

  hide()
  {
    this.isVisible = false;
  }
}
