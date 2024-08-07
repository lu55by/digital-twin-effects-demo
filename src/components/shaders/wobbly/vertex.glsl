uniform float uTime;

attribute vec4 tangent;

varying float vWobble;

#include ../includes/simplex4dNoise.glsl

float getWobble(vec3 pos) {
    vec3 warpedPos = pos;
    warpedPos += simplex4dNoise(vec4(warpedPos, uTime * .4)) * .4;
    return simplex4dNoise(vec4(warpedPos, uTime * .7)) * .5;
}

void main() {

    // Compute the normal
    float shift = .01;
    // BiTangent
    // vec3 biTangent = cross(tangent.xyz, normal);
    vec3 biTangent = cross(normal, tangent.xyz);
    vec3 tanPos = csm_Position + tangent.xyz * shift;
    vec3 bitPos = csm_Position + biTangent * shift;
    tanPos += getWobble(tanPos) * normal;
    bitPos += getWobble(bitPos) * normal;

    float orginWobble = getWobble(csm_Position);
    csm_Position += orginWobble * normal;

    csm_Normal = cross(normalize(tanPos - csm_Position), normalize(bitPos - csm_Position));

    // Varyings
    vWobble = orginWobble / .5;
}