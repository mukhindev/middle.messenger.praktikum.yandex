type TModifierObject = Record<string, string | boolean>

class BemHandler {
  constructor(
    private block: string,
    private modSymbol: '--' | '_' = '_',
  ) {
    this.block = block;
    this.modSymbol = modSymbol;
  }

  private getModifier({ target, modifier }: { target: string, modifier: TModifierObject }) {
    const classes: string[] = [];

    if (modifier && typeof modifier === 'string') {
      return ` ${target}${this.modSymbol}${modifier}`;
    }

    if (modifier && Array.isArray(modifier)) {
      modifier.forEach((el) => {
        if (!el) return;
        classes.push(`${target}${this.modSymbol}${el}`);
      });
      return classes.length ? ` ${classes.join(' ')}` : '';
    }

    if (modifier && Array.isArray(modifier)) {
      const modifiers = Object.entries(modifier);
      modifiers.forEach((el) => {
        if (!el[1]) {
          return '';
        };
        if (typeof el[1] === 'boolean') {
          return classes.push(`${target}${this.modSymbol}${el[0]}`);
        }
        return classes.push(`${target}${this.modSymbol}${el[0]}_${el[1]}`);
      });
      return classes.length ? ` ${classes.join(' ')}` : '';
    }
  }

  private getBlockWithModifier({ modifier }: {modifier: TModifierObject}) {
    return `${this.block}${this.getModifier({ target: this.block, modifier })}`;
  }

  private getElement({ element }: { element: string }) {
    return `${this.block}__${element}`;
  }

  private getElementWithModifier = (
    { element, modifier }: { element: string, modifier: TModifierObject }
  ) => {
    const bemElement = this.getElement({ element });
    return `${bemElement}${this.getModifier({ target: bemElement, modifier })}`;
  }

  private getBemClass({ element, modifier }: { element: string, modifier: TModifierObject }) {
    if (!element && !modifier) {
      return this.block;
    }
    if (!element && modifier) {
      return this.getBlockWithModifier({ modifier });
    }
    if (element && !modifier) {
      return this.getElement({ element });
    }
    if (element && modifier) {
      return this.getElementWithModifier({ element, modifier });
    }
    return '';
  }

  public get(
    element?: string,
    modifier?: string | string[] | TModifierObject,
    mix?: string,
  ): string {
    return !mix
      ? this.getBemClass({ element, modifier })
      : `${this.getBemClass({ element, modifier })} ${mix}`;
  }
}

export default BemHandler;
