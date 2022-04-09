import {Component} from "@angular/core";

@Component({
  selector: 'header',
  template: `
    <section>
      <div>
        <h4>Currency exchange</h4>
        <ul>
          <li>
            <span>UAH:</span>
            <span>123</span>
          </li>
          <li>
            <span>USD:</span>
            <span>123</span>
          </li>
          <li>
            <span>EUR:</span>
            <span>123</span>
          </li>
        </ul>
      </div>
    </section>
  `,
  styleUrls: ['header.component..css'],
})

export class HeaderComponent {

}
