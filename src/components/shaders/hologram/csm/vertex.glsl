uniform float uTime;
varying vec3 vNormal;
varying vec3 vPos;

#include ../../includes/random2D.glsl

void main() {
    // Glitch Effect
    float frequency = uTime - csm_Position.y;
    float strength = sin(frequency) + sin(frequency * 8.67) + sin(frequency * 4.76);
    strength /= 3.;
    strength = smoothstep(.3, 1., strength);
    strength *= .2;
    csm_Position.x += (random2D(csm_Position.xz - uTime) - .5) * strength;
    csm_Position.z += (random2D(csm_Position.zx - uTime) - .5) * strength;

    // Varyings
    // vNormal = normalize(normalMatrix * normal);
    vNormal = (modelMatrix * vec4(normal, 0.)).xyz;
    vPos = csm_Position;
}