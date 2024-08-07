// Uniforms
uniform float uMinElevation;
uniform float uMaxElevation;
uniform float uTime;
// Uniforms - Colors
uniform vec3 uGradientDistColor;
uniform vec3 uScanningCircleColor;
uniform vec3 uScanningLineColor;
// Uniforms - Colors - Intensities
uniform float uGradientDistColorIntensity;
uniform float uScanningCircleColorIntensity;
uniform float uScanningLineColorIntensity;
// Uniforms - Speeds
uniform float uScanningCircleSpeed;
uniform float uScanningLineSpeed;
// Uniforms - Widths
uniform float uScanningCircleWidth;

// Varyings
varying vec3 vPos;

#include ../includes/gradient.glsl
#include ../includes/scanningCircle.glsl
#include ../includes/scanning2TopLine.glsl

void main() {
    // Gradient Effect
    csm_DiffuseColor.rgb = gradient(csm_DiffuseColor.rgb, uGradientDistColor, uGradientDistColorIntensity, uMaxElevation, vPos.y);
    // Scanning Circle Effect
    csm_DiffuseColor.rgb = scanningCircle(csm_DiffuseColor.rgb, uScanningCircleColor, uScanningCircleColorIntensity, vec2(-160., -200), vPos.xz, uScanningCircleWidth, .001, 600., uTime, uScanningCircleSpeed);
    // Scanning Line Effect
    csm_DiffuseColor.rgb = scanning2TopLine(csm_DiffuseColor.rgb, uScanningLineColor, uScanningLineColorIntensity, uMinElevation, 5., .1, uTime, uScanningLineSpeed, uMaxElevation, vPos.y);

}