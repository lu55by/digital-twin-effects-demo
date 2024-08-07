float random2D(vec2 value) {
    // From 0. ~ 1.
    return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}