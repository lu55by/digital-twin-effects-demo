vec3 scanningCircle(vec3 baseCol, vec3 circleCol, float intensity, vec2 origin, vec2 basedVec2, float width, float blur, float maxRadius, float time, float speed) {
    float d = distance(origin, basedVec2);
    float r = mod(.1 + time * speed, maxRadius);
    return mix(baseCol, circleCol * intensity, smoothstep(r + width, r + width - blur, d) - smoothstep(r, r - blur, d));
}