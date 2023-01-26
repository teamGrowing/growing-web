/* eslint-disable react/default-props-match-prop-types */
import React, { SVGAttributes } from 'react';
import * as icons from '../../../assets/icons/index';
import myTheme from '../../../styles/theme/DefaultTheme';

export type IconType = keyof typeof icons;
export const iconTypes: IconType[] = Object.keys(icons) as IconType[];

export type ColorType = keyof typeof myTheme['color'];
export const colorTypes: ColorType[] = Object.keys(
  myTheme.color
) as ColorType[];

export interface IconProps extends SVGAttributes<SVGElement> {
  icon: IconType;
  size?: number;
  themeColor?: ColorType;
  gradient?: string;
}

/**
 * 🌈 color로 사용하고 싶을 땐, themeColor에 purple600, white, ...를 지정해주면 됩니다.
 * 🌈 gradient로 사용하고 싶을 땐, gradient에 gradient400을 지정해주면 됩니다. 아직 다른 그라데이션 색상은 사용하지 않는 것 같아 400만 정의해놓았습니다.
 * 🚀 default 크기와 색상은 24, gradient400입니다!
 */
export default function Icon({
  icon,
  size,
  themeColor,
  gradient,
  ...props
}: IconProps) {
  const SVGIcon = icons[icon];
  const color = themeColor ? myTheme.color[themeColor] : undefined;
  const iconGradient = color ? undefined : gradient || 'gradient400';

  return (
    <SVGIcon
      width={size}
      height={size}
      fill={color}
      className={iconGradient}
      {...props}
    />
  );
}

Icon.defaultProps = {
  size: 24,
};
