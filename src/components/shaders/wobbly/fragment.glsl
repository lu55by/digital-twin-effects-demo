varying float vWobble;

uniform vec3 uInnerCol;
uniform vec3 uOuterCol;

void main() {
    // Remap vWobble from -1 ~ 1 to 0 ~ 1 using smoothstep
    float remapedWobble = smoothstep(-1., 1., vWobble);
    csm_DiffuseColor.rgb = mix(uInnerCol * 5., uOuterCol * 5., remapedWobble);

    // csm_Emissive *= remapedWobble;
    csm_Roughness = 1. - remapedWobble;
    csm_Metalness = remapedWobble;
}