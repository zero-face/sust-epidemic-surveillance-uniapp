import Model from '../Model';
import { LineStyleOption } from '../../util/types';
import { PathStyleProps } from 'zrender/lib/graphic/Path';
export declare const LINE_STYLE_KEY_MAP: string[][];
declare type LineStyleKeys = 'lineWidth' | 'stroke' | 'opacity' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY' | 'shadowColor' | 'lineDash' | 'lineDashOffset' | 'lineCap' | 'lineJoin' | 'miterLimit';
export declare type LineStyleProps = Pick<PathStyleProps, LineStyleKeys>;
declare class LineStyleMixin {
    getLineStyle(this: Model, excludes?: readonly (keyof LineStyleOption)[]): LineStyleProps;
}
export { LineStyleMixin };
