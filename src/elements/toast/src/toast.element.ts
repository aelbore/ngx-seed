import { CustomElement, Prop, Watch } from 'custom-elements-ts';

export interface ARToastMessage {
  severity?: string;
  summary?: string;
  detail?: string;
}

@CustomElement({
  tag: 'ar-toast',
  templateUrl: './toast.element.html',
  styleUrl: './toast.element.scss'
})
export class ARToastElement extends HTMLElement {

  @Prop() duration;
  @Prop() message;

  @Watch('message')
  onPropertyChangedMessage(value: any) {
    if (value.new) {
      this.showToast(value.new)
    }
  }

  showToast(message: ARToastMessage) {
    const template: any = this.shadowRoot.querySelector('#toast-template');
    const fragment: DocumentFragment = template.content.cloneNode(true);

    const container = fragment.querySelector('.ar-toast-item-container');
    container.classList.add(message.severity);
    container.querySelector('#icon').classList.add(`icon-${message.severity}`);
    container.querySelector('#summary').innerHTML = message.summary;
    container.querySelector('#detail').innerHTML = message.detail;

    this.shadowRoot.querySelector('.ar-toast').appendChild(fragment);
    
    const target: HTMLElement = this.shadowRoot.querySelector('.ar-toast .ar-toast-item-container:last-child');
    this._startTransition(target);
  }

  private _startTransition(target: HTMLElement) {
    const timeout = setTimeout(() => this._endTransition(target), this.duration);
    const handler: EventListener = () => {
      clearTimeout(timeout);
      this._endTransition(target);
    };
    target.classList.add('show');
    target.querySelector('.ar-toast-icon-close').addEventListener('click', handler);
  }

  private _endTransition(target: HTMLElement) {
    target.classList.remove('show');
    setTimeout(() => target && target.remove(), 1500);
  }

}