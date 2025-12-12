uniform float uTime;
uniform vec3 uColor;
//varying vec3 vNormal;
varying vec3 vPos;
void main() {
    vec3 normalizedNormal = normalize(vNormal);
    if(!gl_FrontFacing)
        normalizedNormal *= -1.0;
    float stripes = pow(mod((vPos.y - uTime * .03) * 50., 1.), 5.0);
    float fresnel = max(pow(dot(normalize(vPos - cameraPosition), normalizedNormal) + 1., sin(uTime) + 6.), 0.);

    // Hologram
    float hologram = stripes * fresnel;
    hologram += fresnel * 5.;
    hologram *= smoothstep(.8, 0., fresnel);

    // Color
    vec3 col = uColor;
    col.rgb += vPos.xyz;
    // Tweak the r channel of col.
    col.r *= abs(sin(uTime * 2.));
    csm_FragColor = vec4(col, hologram);
//    csm_FragColor = vec4(col, 1.);
}