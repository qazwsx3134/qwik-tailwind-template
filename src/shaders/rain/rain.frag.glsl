in vec2 uvInterpolator;
uniform float u_time;
uniform sampler2D u_texture;

// Random number generator
// input Large number to get a random number
// https://thebookofshaders.com/10/
float Random11(float inputValue, float seed){
    return fract(sin(inputValue * 345.456 )*seed);
}

float Random21(vec2 inputValue, float seed){
    return fract(sin(dot(inputValue, vec2(123.456,43.12)))*seed);
}

// https://www.youtube.com/watch?v=Rl3clbrsI40
vec2 Drops(vec2 uv, float seed) {
    float shiftY = Random11(0.7, seed);
    uv.y += shiftY;
    
    float cellsResolution = 10.0;
    // Set the number of cells 10x10
    uv *= cellsResolution;
    
    float rowIndex = floor(uv.y);
    // Create a random shift x for each row
    float shiftX = Random11(rowIndex, seed);
    uv.x += shiftX;

    vec2 cellIndex = floor(uv);
    vec2 cellUv = fract(uv);

    // get the center of the cell
    vec2 cellCenter = vec2(0.5);
    float distanceToCenter = distance(cellUv, cellCenter);
    float isInsideDrops = 1.0 - step(0.1, distanceToCenter);

    // Randomly delete some cells step(a,b) returns 1.0 if a < b
    float isDropShown = step(0.8, Random21(cellIndex, seed + 123456.123));

    // drop intensity
    // Making each drop intensity(evaporate) different
    float dropIntensity = 1.0 - fract(u_time * 0.1 + Random21(cellIndex, seed + 46545.123)*2.0) *2.0;
    // Smoothing the drop intensity
    dropIntensity = sign(dropIntensity) * pow(abs(dropIntensity), 4.0);
    // Clamp the drop intensity between 0.0 and 1.0
    dropIntensity = clamp(dropIntensity, 0.0, 1.0);

    // 讓水滴變成一個圓弧的透鏡
    vec2 vecToCenter = normalize(cellCenter - cellUv);

    // 透鏡的強度 透鏡的強度越大，水滴就會越大 distanceToCenter 用來平滑
    float dropShiness = 40.0;
    vec2 dropValue = vecToCenter * pow(abs(distanceToCenter), 2.0) * dropShiness;
    vec2 drop = dropValue * isDropShown * dropIntensity * isInsideDrops;

    return drop;
}

void main() {
    vec2 uv = uvInterpolator;
    
    vec2 drops = vec2(0,0);
    // Create 10 drops shaders
    for (int i = 0; i < 10; i++) {
        drops += Drops(uv, 123123.123 + float(i) * 22142.456);
    }
    uv += drops;
    vec4 color = texture2D(u_texture, uv);
    gl_FragColor = color;
}