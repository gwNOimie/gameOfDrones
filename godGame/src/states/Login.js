/* globals __DEV__ */
import Phaser from 'phaser'
import _PhaserInput from '@orange-games/phaser-input/build/phaser-input'
const PhaserInput = _PhaserInput.PhaserInput
export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.game.load.image('drone', 'assets/images/drone_gwno_1.png')
    console.log(
      PhaserInput
    )
    this.game.add.plugin(PhaserInput.Plugin)
  }

  create () {
    const title = 'Game of Drones'
    const presentation = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    let titleBanner = this.add.text(this.world.centerX, 80, title, {
      font: '40px Russo One',
      fill: '#000000',
      smoothed: false
    })

    let presentationBanner = this.add.text(this.world.centerX, 160, presentation, {
      align: 'center',
      wordWrap: true,
      font: '20px Russo One',
      fill: '#000000',
      wordWrapWidth: this.world.width - 100,
      smoothed: false
    })

    titleBanner.padding.set(10, 16)
    titleBanner.anchor.setTo(0.5)

    presentationBanner.padding.set(10, 16)
    presentationBanner.anchor.x = 0.5

    const leftDrone = this.game.add.sprite(this.world.width / 3, this.world.height / 3, 'drone')
    const rightDrone = this.game.add.sprite(this.world.width * 2 / 3, this.world.height / 3, 'drone')

    const loginInput = this.game.add.inputField(this.world.width / 2, this.world.height / 3, {
      font: '20px Russo One',
      fill: '#212121',
      fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Login'
    })

    const passwordInput = this.game.add.inputField(this.world.width / 2, (this.world.height / 3) + 50, {
      font: '20px Russo One',
      fill: '#212121',
      fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Password'
    })

    const submitBtn = this.game.add.button(this.world.width / 2, (this.world.height / 3) + 100, 'drone', submit, this, 2, 1, 0)

    function submit () {
      console.log('submit')
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.cat, 32, 32)
    }
  }
}
