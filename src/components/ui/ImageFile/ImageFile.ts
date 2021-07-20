import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './ImageFile.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultImage from '../../../assets/images/default-avatar.jpg';
import './ImageFile.scss';

const bem = new BemHandler('image-file');

interface IImageFile {
  classMix?: string,
  src: string,
  alt: string,
  onChange: (file: File) => void
}

class ImageFile extends Block {
  constructor(props?: IImageFile) {
    super('label', {
      className: bem.get(),
      classNameRoot: bem.get('', '', props?.classMix),
      src: props?.src || defaultImage,
      alt: props?.alt ?? '',
      onChange: props?.onChange,
      events: {
        change: (evt: InputEvent) => {
          const { files }: { files: FileList | null } = evt.target as HTMLInputElement;
          if (!files?.length) {
            return;
          }
          const [file] = files;
          this.props.onChange(file);
        },
      },
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default ImageFile;
