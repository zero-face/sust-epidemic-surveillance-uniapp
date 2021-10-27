import BrushController from '../../helper/BrushController';
import * as history from '../../dataZoom/history';
import { ToolboxFeature, ToolboxFeatureModel, ToolboxFeatureOption } from '../featureManager';
import GlobalModel from '../../../model/Global';
import ExtensionAPI from '../../../core/ExtensionAPI';
import { Payload, ItemStyleOption } from '../../../util/types';
import { ModelFinderIndexQuery, ModelFinderIdQuery } from '../../../util/model';
declare const ICON_TYPES: readonly ["zoom", "back"];
declare type IconType = typeof ICON_TYPES[number];
export interface ToolboxDataZoomFeatureOption extends ToolboxFeatureOption {
    type?: IconType[];
    icon?: {
        [key in IconType]?: string;
    };
    title?: {
        [key in IconType]?: string;
    };
    filterMode?: 'filter' | 'weakFilter' | 'empty' | 'none';
    xAxisIndex?: ModelFinderIndexQuery;
    yAxisIndex?: ModelFinderIndexQuery;
    xAxisId?: ModelFinderIdQuery;
    yAxisId?: ModelFinderIdQuery;
    brushStyle?: ItemStyleOption;
}
declare type ToolboxDataZoomFeatureModel = ToolboxFeatureModel<ToolboxDataZoomFeatureOption>;
declare class DataZoomFeature extends ToolboxFeature<ToolboxDataZoomFeatureOption> {
    _brushController: BrushController;
    _isZoomActive: boolean;
    render(featureModel: ToolboxDataZoomFeatureModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    onclick(ecModel: GlobalModel, api: ExtensionAPI, type: IconType): void;
    remove(ecModel: GlobalModel, api: ExtensionAPI): void;
    dispose(ecModel: GlobalModel, api: ExtensionAPI): void;
    private _onBrush;
    _dispatchZoomAction(snapshot: history.DataZoomStoreSnapshot): void;
    static getDefaultOption(ecModel: GlobalModel): ToolboxDataZoomFeatureOption;
}
export default DataZoomFeature;
