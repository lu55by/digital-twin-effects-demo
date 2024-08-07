uniform float uTime;
uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
    vec3 normalizedNormal = normalize(vNormal);
    if(!gl_FrontFacing)
        normalizedNormal *= -1.0;
    float stripes = pow(mod((vPos.y - uTime * .03) * 50., 1.), 5.0);
    float fresnel = max(pow(dot(normalize(vPos - cameraPosition), normalizedNormal) + 1., sin(uTime) + 6.), 0.);
    float hologram = stripes * fresnel;
    hologram += fresnel * 5.;
    hologram *= smoothstep(.8, 0., fresnel);
    vec3 col = vec3(0., 1., 1.);
    col = uColor;
    csm_FragColor = vec4(col, hologram);
}