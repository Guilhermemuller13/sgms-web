import { FC } from 'react';

import {
  ArrowBackIos as ArrowLeft,
  ArrowForwardIos as ArrowRight
} from 'styled-icons/material-outlined';

import Slider, { SliderSettings } from '../Slider';

import * as S from './styles';

const settings: SliderSettings = {
  slidesToShow: 4,
  infinite: false,
  lazyLoad: 'ondemand',
  responsive: [
    {
      breakpoint: 1375,
      settings: {
        arrows: false,
        slidesToShow: 3.2
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 2.2
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 1.2
      }
    }
  ],
  nextArrow: <ArrowRight aria-label="next image" />,
  prevArrow: <ArrowLeft aria-label="previous image" />
};

type GalleryImageProps = {
  src: string;
  label: string;
};

export type GalleryProps = {
  items: GalleryImageProps[];
};

const Gallery: FC<GalleryProps> = ({ items }) => {
  return (
    <S.Wrapper>
      <Slider settings={settings}>
        {items.map((item, index) => {
          return (
            <img
              role="button"
              key={`thumb-${index}`}
              src={item.src}
              alt={`Thumb - ${item.label}`}
            />
          );
        })}
      </Slider>
    </S.Wrapper>
  );
};

export default Gallery;
