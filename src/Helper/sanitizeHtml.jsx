import DOMPurify from 'dompurify';

export const sanitizeHtml = (htmlContent) => {
  return DOMPurify.sanitize(htmlContent);
};
