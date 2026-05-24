declare module 'react-simple-maps' {
  import { ComponentType, SVGProps, ReactNode } from 'react';
  
  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, any>;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
    [key: string]: any;
  }
  
  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: any[] }) => ReactNode;
    [key: string]: any;
  }
  
  export interface GeographyProps {
    geography: any;
    style?: Record<string, React.CSSProperties>;
    className?: string;
    [key: string]: any;
  }
  
  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    [key: string]: any;
  }
  
  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    children?: ReactNode;
    [key: string]: any;
  }
  
  export interface LineProps {
    from: [number, number];
    to: [number, number];
    [key: string]: any;
  }
  
  export interface SphereProps {
    [key: string]: any;
  }
  
  export interface GraticuleProps {
    [key: string]: any;
  }
  
  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Line: ComponentType<LineProps>;
  export const Sphere: ComponentType<SphereProps>;
  export const Graticule: ComponentType<GraticuleProps>;
}
