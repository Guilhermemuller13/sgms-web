import { FC } from "react";
import SlickSlider, { Settings } from "react-slick";

import * as S from "./styles";

export type SliderSettings = Settings;

export type SliderProps = {
  children: React.ReactNode;
  settings: SliderSettings;
};

const Slider: FC<SliderProps> = ({ children, settings }) => {
  const renderSlider = () => {
    //@ts-ignore
    return <SlickSlider {...settings}>{children}</SlickSlider>;
  };

  return <S.Wrapper>{renderSlider()}</S.Wrapper>;
};

export default Slider;
