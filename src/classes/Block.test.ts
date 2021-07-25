import { expect } from 'chai';
import Block from './Block';

describe('Block', () => {
  let isComponentDidMount = false;
  let isComponentRender = false;
  let isComponentRenderAfterUpdateProps = false;

  interface IComponent {
    className? : string
  }

  class Component extends Block {
    constructor(props?: IComponent) {
      super('button', {
        className: props?.className ?? 'button',
      });
    }

    componentDidMount() {
      isComponentDidMount = true;
    }

    render() {
      isComponentRender = true;
      if (this.props.className === 'updated-button') {
        isComponentRenderAfterUpdateProps = true;
      }
      return '<template class="button">Нажми меня!</template>';
    }
  }

  const component = new Component();

  it('Create instance of Block with default props', () => {
    const componentWithDefaultProps = new Component();
    expect(componentWithDefaultProps.props.className).to.eq('button');
  });

  it('Create instance of Block with custom props', () => {
    const componentWithCustomProps = new Component({
      className: 'custom-button',
    });
    expect(componentWithCustomProps.props.className).to.eq('custom-button');
  });

  it('Component did mount', () => {
    expect(isComponentDidMount).to.eq(true);
  });

  it('Component did render', () => {
    expect(isComponentRender).to.eq(true);
  });

  it('Set class from template element', () => {
    expect(component.getContent().className).to.eq('button');
  });

  it('Set assigned for root element', () => {
    expect(component.getContent().tagName).to.eq('BUTTON');
  });

  it('Set content', () => {
    expect(component.getContent().textContent).to.eq('Нажми меня!');
  });

  it('Update prop', () => {
    component.setProps({
      className: 'updated-button',
    });
    expect(component.props.className).to.eq('updated-button');
  });

  it('Render after update props', () => {
    expect(isComponentRenderAfterUpdateProps).to.eq(true);
  });

  it('Set new prop', () => {
    component.setProps({
      text: 'new-text',
    });
    expect(component.props.text).to.eq('new-text');
  });
});
