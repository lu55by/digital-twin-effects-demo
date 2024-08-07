vec3 gradient(vec3 baseCol, vec3 gradientCol, float intensity, float maxHeight, float direction) {
    return mix(baseCol, gradientCol * intensity, max(0., direction / maxHeight));
}