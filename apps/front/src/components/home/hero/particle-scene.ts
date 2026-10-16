import type * as Three from 'three'

import { PLACES, isLand } from '@/lib/geo/land'

type Opts = {
  host: HTMLElement
  fontFamily: string
  fg: string
  accent: string
  reduce: boolean
}

export type ParticleScene = {
  /** 0 = name, 1 = globe with the Paris → Miami arc, 2 = network. Fractional values blend. */
  setMorph: (target: number, arcProgress: number) => void
  setPointer: (x: number, y: number) => void
  start: () => void
  stop: () => void
  dispose: () => void
}

const lonLatToXYZ = (
  lon: number,
  lat: number,
  r: number
): [number, number, number] => {
  const a = (lon * Math.PI) / 180
  const b = (lat * Math.PI) / 180
  return [
    r * Math.cos(b) * Math.sin(a),
    r * Math.sin(b),
    r * Math.cos(b) * Math.cos(a)
  ]
}

/** Builds the WebGL particle hero. three.js is passed in so the page only loads it when the hero mounts. */
export function createParticleScene(
  THREE: typeof Three,
  o: Opts
): ParticleScene {
  const mob = o.host.clientWidth < 700
  const N = mob ? 6000 : 12000
  const R = mob ? 1.25 : 1.6

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1))
  o.host.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
  cam.position.set(0, 0.35, 6)

  // targets for the three shapes
  const name = new Float32Array(N * 3)
  const globe = new Float32Array(N * 3)
  const A = new Float32Array(N * 3)
  const B = new Float32Array(N * 3)
  const edge = new Float32Array(N)
  const rnd = new Float32Array(N)

  {
    const c = document.createElement('canvas')
    const W = 1200
    const H = 520
    c.width = W
    c.height = H
    const x = c.getContext('2d', { willReadFrequently: true })!
    const lines = ['MOHAMED', 'TAHIRI']
    x.font = `700 200px ${o.fontFamily}`
    const wm = Math.max(...lines.map((l) => x.measureText(l).width))
    const fs = 200 * Math.min(1, (W * 0.94) / wm)
    x.font = `700 ${fs}px ${o.fontFamily}`
    x.textAlign = 'center'
    x.textBaseline = 'middle'
    x.fillStyle = '#fff'
    lines.forEach((l, i) => x.fillText(l, W / 2, H / 2 + (i - 0.5) * fs * 0.92))
    const d = x.getImageData(0, 0, W, H).data
    const pts: number[] = []
    for (let y = 0; y < H; y += 3)
      for (let k = 0; k < W; k += 3)
        if (d[(y * W + k) * 4 + 3] > 128) pts.push(k, y)
    const sc = (mob ? 3.4 : 5.4) / W
    for (let i = 0; i < N; i++) {
      const j = Math.floor((Math.random() * pts.length) / 2) * 2
      name[i * 3] = (pts[j] - W / 2) * sc + (Math.random() - 0.5) * sc * 3
      name[i * 3 + 1] =
        -(pts[j + 1] - H / 2) * sc + (Math.random() - 0.5) * sc * 3
      name[i * 3 + 2] = (Math.random() - 0.5) * 0.18
    }
  }

  for (let i = 0; i < N; i++) {
    let lon = 0
    let lat = 0
    let tries = 0
    // mostly land, with a few ocean points so the sphere keeps its silhouette
    do {
      lon = Math.random() * 360 - 180
      lat = (Math.asin(Math.random() * 2 - 1) * 180) / Math.PI
      tries++
    } while (!isLand(lon, lat) && Math.random() > 0.06 && tries < 60)
    globe.set(lonLatToXYZ(lon, lat, R), i * 3)
    rnd[i] = Math.random()
  }

  {
    const layers = [4, 7, 9, 7, 4]
    const nodes = layers.map((n, li) =>
      Array.from({ length: n }, (_, k) => {
        const a = (k / n) * Math.PI * 2 + li
        const rr = 0.25 + n * 0.11
        return [
          (li - 2) * (mob ? 0.75 : 1.15),
          Math.cos(a) * rr * (mob ? 0.8 : 1),
          Math.sin(a) * rr * 0.6
        ] as const
      })
    )
    for (let i = 0; i < N; i++) {
      if (i < N * 0.42) {
        const li = Math.floor(Math.random() * layers.length)
        const n = nodes[li][Math.floor(Math.random() * layers[li])]
        const j = 0.06
        const p = [
          n[0] + (Math.random() - 0.5) * j,
          n[1] + (Math.random() - 0.5) * j,
          n[2] + (Math.random() - 0.5) * j
        ]
        A.set(p, i * 3)
        B.set(p, i * 3)
      } else {
        const li = Math.floor(Math.random() * (layers.length - 1))
        A.set(nodes[li][Math.floor(Math.random() * layers[li])], i * 3)
        B.set(nodes[li + 1][Math.floor(Math.random() * layers[li + 1])], i * 3)
        edge[i] = 1
      }
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(name, 3))
  geo.setAttribute('aName', new THREE.BufferAttribute(name, 3))
  geo.setAttribute('aGlobe', new THREE.BufferAttribute(globe, 3))
  geo.setAttribute('aA', new THREE.BufferAttribute(A, 3))
  geo.setAttribute('aB', new THREE.BufferAttribute(B, 3))
  geo.setAttribute('aEdge', new THREE.BufferAttribute(edge, 1))
  geo.setAttribute('aR', new THREE.BufferAttribute(rnd, 1))

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uT: { value: 0 },
      uM: { value: 0 },
      uIntro: { value: o.reduce ? 1 : 0 },
      uRot: { value: 0.7 },
      uSize: { value: mob ? 15 : 17 },
      uDpr: { value: Math.min(2, devicePixelRatio || 1) },
      uFg: { value: new THREE.Color(o.fg) },
      uAcc: { value: new THREE.Color(o.accent) }
    },
    vertexShader: /* glsl */ `
      attribute vec3 aName; attribute vec3 aGlobe; attribute vec3 aA; attribute vec3 aB; attribute float aEdge; attribute float aR;
      uniform float uT, uM, uIntro, uRot, uSize, uDpr;
      varying float vEdge; varying float vA;
      void main() {
        float c = cos(uRot), s = sin(uRot);
        vec3 g = vec3(c * aGlobe.x + s * aGlobe.z, aGlobe.y, -s * aGlobe.x + c * aGlobe.z);
        // edge particles travel along their connection: the signal flowing through the network
        vec3 net = aEdge > .5 ? mix(aA, aB, fract(uT * .16 + aR)) : aA;
        float d = aR * .35;
        float k1 = smoothstep(d, d + .65, clamp(uM, 0., 1.));
        float k2 = smoothstep(d, d + .65, clamp(uM - 1., 0., 1.));
        vec3 p = mix(mix(aName, g, k1), net, k2);
        vec3 sc = (vec3(fract(aR * 13.1), fract(aR * 71.7), fract(aR * 37.3)) - .5) * vec3(10., 7., 5.);
        p = mix(sc, p, smoothstep(aR * .4, aR * .4 + .6, uIntro));
        p += .012 * vec3(sin(uT * 1.3 + aR * 40.), cos(uT * 1.1 + aR * 31.), sin(uT * .9 + aR * 17.));
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * uDpr * (1. + aEdge * k2 * .5) / -mv.z;
        vEdge = aEdge * k2;
        // the far side of the globe is dimmed so it reads as a sphere
        vA = (.45 + .55 * fract(aR * 91.)) * (1. - k1 * (1. - k2) * (1. - smoothstep(-1.4, .3, g.z)) * .8);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uFg, uAcc; varying float vEdge; varying float vA;
      void main() {
        float d = length(gl_PointCoord - .5);
        if (d > .5) discard;
        float a = 1. - smoothstep(0., .5, d);
        gl_FragColor = vec4(mix(uFg, uAcc, vEdge), a * a * vA * .9);
      }`
  })
  const points = new THREE.Points(geo, mat)
  // the bounding sphere is computed from the name layout only, so culling would drop the globe
  points.frustumCulled = false
  scene.add(points)

  // Paris → Miami arc, lifted above the globe
  const pA = new THREE.Vector3(...lonLatToXYZ(...PLACES.paris, 1))
  const pB = new THREE.Vector3(...lonLatToXYZ(...PLACES.miami, 1))
  const arcPts: Three.Vector3[] = []
  for (let k = 0; k <= 80; k++) {
    const t = k / 80
    const v = new THREE.Vector3().copy(pA).lerp(pB, t).normalize()
    arcPts.push(v.multiplyScalar(R * (1 + 0.22 * Math.sin(Math.PI * t))))
  }
  const arcMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(o.accent),
    transparent: true,
    opacity: 0
  })
  const arcLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(arcPts),
    arcMat
  )
  const markMat = new THREE.PointsMaterial({
    color: new THREE.Color(o.accent),
    size: 0.09,
    transparent: true,
    opacity: 0
  })
  const marks = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints([arcPts[0], arcPts[80]]),
    markMat
  )
  const arc = new THREE.Group()
  arc.add(arcLine, marks)
  scene.add(arc)

  let raf = 0
  let running = false
  let t0 = performance.now()
  let morph = 0
  let target = 0
  let arcP = 0
  let mx = 0
  let my = 0

  const size = () => {
    const w = o.host.clientWidth
    const h = o.host.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    cam.aspect = w / h
    cam.position.z = w < h ? 7.6 : 6
    cam.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(size)
  ro.observe(o.host)
  size()

  const frame = (now: number) => {
    raf = 0
    if (!running) return
    const t = (now - t0) / 1000
    morph += (target - morph) * 0.07
    mat.uniforms.uT.value = o.reduce ? 0 : t
    mat.uniforms.uM.value = morph
    if (!o.reduce) mat.uniforms.uIntro.value = Math.min(1, t / 1.6)
    const rot = 0.7 + Math.sin(t * 0.15) * 0.25 + mx * 0.4
    mat.uniforms.uRot.value = rot
    arc.rotation.y = rot
    const ga = Math.max(0, 1 - Math.abs(morph - 1) * 2.2)
    arcMat.opacity = ga
    markMat.opacity = ga
    arcLine.geometry.setDrawRange(0, Math.max(2, Math.round(81 * arcP)))
    cam.position.x += (mx * 0.5 - cam.position.x) * 0.05
    cam.position.y += (0.35 - my * 0.35 - cam.position.y) * 0.05
    cam.lookAt(0, 0, 0)
    renderer.render(scene, cam)
    raf = requestAnimationFrame(frame)
  }

  return {
    setMorph(m, a) {
      target = m
      arcP = a
    },
    setPointer(x, y) {
      mx = x
      my = y
    },
    start() {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
      raf = 0
    },
    dispose() {
      this.stop()
      ro.disconnect()
      geo.dispose()
      mat.dispose()
      arcLine.geometry.dispose()
      arcMat.dispose()
      marks.geometry.dispose()
      markMat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
      t0 = 0
    }
  }
}
