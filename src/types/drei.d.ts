import * as THREE from 'three';

declare module '@react-three/drei' {
  export interface GLTFResult {
    nodes: Record<string, THREE.Object3D>;
    materials: Record<string, THREE.Material>;
    animations: THREE.AnimationClip[];
    scene: THREE.Group;
  }

  export function useGLTF<T extends string | string[]>(
    path: T,
    useDraco?: boolean | string,
    useMeshOpt?: boolean | string
  ): T extends string[] ? GLTFResult[] : GLTFResult;
  
  export namespace useGLTF {
    function preload(path: string | string[], useDraco?: boolean | string): void;
    function clear(path?: string | string[]): void;
  }
} 