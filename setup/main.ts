import { startSketch } from './sketch'

// Slidev のアプリ初期化フック。枠線を手描きの線に描き直す処理を1度だけ起動する
export default function setupMain() {
  startSketch()
}
