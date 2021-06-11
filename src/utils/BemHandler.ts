type TBemElement = string | undefined;
type TBemModifierObject = Record<string, string | boolean>;
type TBemModifierElement = string | string[] | TBemModifierObject | undefined
type TBemMix = string | undefined;


class BemHandler {
  constructor(
    private block: string,
    private modSymbol: '--' | '_' = '_',
  ) {
    this.block = block;
    this.modSymbol = modSymbol;
  }

  private getModifier(target: string, modifier: TBemModifierElement) {
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

  private getBlockWithModifier(modifier: TBemModifierElement) {
    return `${this.block}${this.getModifier(this.block, modifier)}`;
  }

  private getElement(element: TBemElement) {
    return `${this.block}__${element}`;
  }

  private getElementWithModifier = (element: TBemElement, modifier: TBemModifierElement) => {
    const bemElement = this.getElement(element);
    return `${bemElement}${this.getModifier(bemElement, modifier)}`;
  }

  private getBemClass(element: TBemElement, modifier: TBemModifierElement) {
    if (!element && !modifier) {
      return this.block;
    }
    if (!element && modifier) {
      return this.getBlockWithModifier(modifier);
    }
    if (element && !modifier) {
      return this.getElement(element);
    }
    if (element && modifier) {
      return this.getElementWithModifier(element, modifier);
    }
    return '';
  }

  public get(element?: TBemElement, modifier?: TBemModifierElement, mix?: TBemMix, ): string {
    return !mix
      ? this.getBemClass(element, modifier)
      : `${this.getBemClass(element, modifier)} ${mix}`;
  }
}

export default BemHandler;
