export const getDistance = (a,b) => {
  const R = 6371000 // metres
  const φ1 = a.latitude * (Math.PI / 180)
  const φ2 = b.latitude * (Math.PI / 180)
  const Δφ = φ2 - φ1
  const Δλ = (b.longitude-a.longitude)* (Math.PI / 180)
  const α = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(α), Math.sqrt(1-α))
  const d = R * c
  return d
}
