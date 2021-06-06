import './ErrorInfo.scss';

function ErrorInfo(props) {
  const {
    statusCode,
    message,
    returnLink,
    returnLinkText,
  } = props;

  ErrorInfo.context = {
    className: 'error-info',
    statusCode,
    message,
    returnLink,
    returnLinkText,
  };

  return `
    <div class="{{ className }}">
      <h1 class="{{ className }}__title">Ошибка {{ statusCode }}</h1>
      <p class="{{ className }}__message">{{ message }}</p>
      <a class="{{ className }}__return-link" href="{{ returnLink }}">{{ returnLinkText }}</a>
    </div>
  `;
}

export default ErrorInfo;
