uniform float uTime;
varying vec3 vNormal;
varying vec3 vPos;

#include ../includes/random2D.glsl

void main() {
    vec4 modelPos = modelMatrix * vec4(position, 1.0);

    // Glitch Effect
    float frequency = uTime - modelPos.y;
    float strength = sin(frequency) + sin(frequency * 8.67) + sin(frequency * 4.76);
    strength /= 3.;
    strength = smoothstep(.3, 1., strength);
    strength *= .2;
    modelPos.x += (random2D(modelPos.xz - uTime) - .5) * strength;
    modelPos.z += (random2D(modelPos.zx - uTime) - .5) * strength;

    // Final Position
    gl_Position = projectionMatrix * viewMatrix * modelPos;

    // Varyings
    // vNormal = normalize(normalMatrix * normal);
    vNormal = (modelMatrix * vec4(normal, 0.)).xyz;
    vPos = modelPos.xyz;
}