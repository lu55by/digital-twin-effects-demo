vec3 scanning2TopLine(vec3 baseCol, vec3 lineCol, float intensity, float offset, float width, float blur, float time, float speed, float maxHeight, float direction) {
    float s = mod((offset - width) + time * speed, maxHeight);
    return mix(baseCol, lineCol * intensity, smoothstep(s, s + blur, direction) * smoothstep(s + width, s + width - blur, direction));
}