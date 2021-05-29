import React from 'react';

export interface RectProps extends React.SVGProps<SVGRectElement> {}
export const Rect = (props: RectProps) => <rect {...props} rx="2" ry="2" />;
