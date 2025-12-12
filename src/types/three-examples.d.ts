declare module 'three/examples/jsm/loaders/OBJLoader' {
  import { Loader, LoadingManager, Group } from 'three';
  export class OBJLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(url: string, onLoad: (group: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
    parse(data: string): Group;
    setMaterials(materials: any): this;
  }
}

declare module 'three/examples/jsm/loaders/MTLLoader' {
    import { Loader, LoadingManager, Material } from 'three';
    export interface MaterialCreator {
        preload(): void;
        materials: {[key: string]: Material};
    }
    export class MTLLoader extends Loader {
        constructor(manager?: LoadingManager);
        load(url: string, onLoad: (materials: MaterialCreator) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
        parse(text: string): MaterialCreator;
        setMaterialOptions(value: any): void;
    }
}
