declare module 'sdmx-json-parser' {
    export class SDMXParser {
        constructor();
        parseSeriesInDatasets(txt: string): Record<string, any>;
        getDataset(api: string, options?: any): Promise<any>;
        getDatasets(api: string, options?: any): Promise<any>;
        getStructure(): any;
        getName(): string;
        getDescription(): string;
        getAttributes(): any[];
        getDimensions(): any[];
        getDimension(id: string): any[];
        getActiveDimensions(): any[];
        getObservations(): Record<string, any>;
        getAnnotations(): any[];
        getData(options?: Record<string, any>): any[];
    }
}