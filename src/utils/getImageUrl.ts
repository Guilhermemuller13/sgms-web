export const getImageUrl = (url: string | undefined): string => {
  if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
    return `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${url}`;
  }

  if (url) {
    return url;
  }

  return '';
};
